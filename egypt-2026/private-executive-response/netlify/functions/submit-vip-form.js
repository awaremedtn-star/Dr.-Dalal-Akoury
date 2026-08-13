/**
 * netlify/functions/submit-vip-form.js
 * JT Foxx Egypt 2026 — Private Executive Coordination
 *
 * REQUIRED NETLIFY ENVIRONMENT VARIABLES:
 *   GHL_API_TOKEN
 *   GHL_LOCATION_ID
 */

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";
const RESPONSE_TAG = "VIP - Private Response Received";

const FIELD_DEFS = {
  whatsapp: {
    key: "contact.vip_whatsapp_number",
    names: ["VIP WhatsApp Number"]
  },
  preferredNextStep: {
    key: "contact.vip_preferred_next_step",
    names: ["VIP Preferred Next Step"]
  },
  preferredCommunication: {
    key: "contact.vip_preferred_communication",
    names: ["VIP Preferred Communication"]
  },
  strategicAreas: {
    key: "contact.vip_strategic_areas",
    names: ["VIP Strategic Areas"]
  },
  privateNote: {
    key: "contact.vip_private_note",
    names: ["VIP Private Note"]
  },
  officeContactName: {
    key: "contact.vip_office_contact_name",
    names: ["VIP Office Contact Name"]
  },
  officeContactTitle: {
    key: "contact.vip_contact_title",
    names: ["VIP_Contact Title", "VIP Contact Title"]
  },
  officeContactEmail: {
    key: "contact.vip_direct_email",
    names: ["VIP_contact_ Direct Email", "VIP Contact Direct Email"]
  },
  officeContactPhone: {
    key: "contact.vip_contact_direct_phonewhats_app",
    names: [
      "VIP_contact Direct phone/Whats App",
      "VIP_Contact Direct phone/Whats App",
      "VIP Contact Direct Phone/WhatsApp"
    ]
  }
};

const STRATEGIC_AREA_NORMALIZATION = {
  "Investment Development & Tourism": "Investment, Development & Tourism",
  "Government Public-Private Collaboration": "Government / Public-Private Collaboration",
  "Education Leadership & Physician Training": "Education, Leadership & Physician Training",
  "AI Technology & Innovation": "AI, Technology & Innovation",
  "Philanthropy Humanitarian Initiatives": "Philanthropy / Humanitarian Initiatives"
};

function respond(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(body)
  };
}

function text(value) {
  return String(value == null ? "" : value).trim();
}

function splitName(fullName) {
  const parts = text(fullName).split(/\s+/).filter(Boolean);
  return {
    firstName: parts.shift() || "",
    lastName: parts.join(" ")
  };
}

function normalizeNextStep(value) {
  const v = text(value);
  return v === "Arrange a Private Conversation"
    ? "Schedule a Private Conversation"
    : v;
}

function normalizeStrategicAreas(value) {
  const raw = Array.isArray(value)
    ? value
    : text(value)
      ? text(value).split(",").map(v => v.trim()).filter(Boolean)
      : [];

  return raw.map(v => STRATEGIC_AREA_NORMALIZATION[v] || v);
}

function getPayload(body) {
  return {
    honeypot: text(body.company || body.vip_website),
    fullName: text(body.fullName || body.full_name),
    email: text(body.email),
    whatsapp: text(body.whatsapp || body.vip_whatsapp_number),

    strategicAreas: normalizeStrategicAreas(
      body.strategicAreas !== undefined
        ? body.strategicAreas
        : body.vip_strategic_areas
    ),

    privateNote: text(
      body.privateNote !== undefined
        ? body.privateNote
        : body.vip_conversation_value
    ),

    preferredNextStep: normalizeNextStep(
      body.preferredNextStep !== undefined
        ? body.preferredNextStep
        : body.vip_preferred_meeting_format
    ),

    preferredCommunication: text(
      body.preferredCommunication !== undefined
        ? body.preferredCommunication
        : body.vip_preferred_communication
    ),

    officeContactName: text(
      body.officeContactName !== undefined
        ? body.officeContactName
        : body.vip_office_contact_name
    ),

    officeContactTitle: text(
      body.officeContactTitle !== undefined
        ? body.officeContactTitle
        : body.vip_office_contact_role
    ),

    officeContactEmail: text(
      body.officeContactEmail !== undefined
        ? body.officeContactEmail
        : body.vip_office_contact_email
    ),

    officeContactPhone: text(
      body.officeContactPhone !== undefined
        ? body.officeContactPhone
        : body.vip_office_contact_phone
    )
  };
}

async function ghlFetch(path, token, options = {}) {
  const response = await fetch(GHL_API_BASE + path, {
    ...options,
    headers: {
      Authorization: "Bearer " + token,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const err = new Error(`GHL request failed (${response.status})`);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function resolveCustomFieldIds(locationId, token) {
  const data = await ghlFetch(
    `/locations/${encodeURIComponent(locationId)}/customFields?model=contact`,
    token,
    { method: "GET" }
  );

  const fields =
    data.customFields ||
    data.fields ||
    (data.data && data.data.customFields) ||
    [];

  const byKey = new Map();
  const byName = new Map();

  for (const field of fields) {
    const key = text(field.fieldKey || field.key);
    const name = text(field.name);
    const id = text(field.id || field._id);

    if (!id) continue;

    if (key) {
      byKey.set(key.toLowerCase(), id);
    }

    if (name) {
      byName.set(name.toLowerCase(), id);
    }
  }

  const resolved = {};

  for (const [logicalName, def] of Object.entries(FIELD_DEFS)) {
    const exactKey = def.key.toLowerCase();
    const shortKey = def.key.replace(/^contact\./, "").toLowerCase();

    let id =
      byKey.get(exactKey) ||
      byKey.get(shortKey) ||
      null;

    if (!id) {
      for (const displayName of def.names || []) {
        id = byName.get(displayName.toLowerCase()) || null;
        if (id) break;
      }
    }

    resolved[logicalName] = id;
  }

  return resolved;
}

function addCustomField(list, id, fieldValue) {
  if (!id) return;
  if (fieldValue == null) return;

  if (Array.isArray(fieldValue) && fieldValue.length === 0) {
    return;
  }

  if (!Array.isArray(fieldValue) && text(fieldValue) === "") {
    return;
  }

  list.push({
    id,
    fieldValue
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return respond(405, {
      success: false,
      error: "Method not allowed."
    });
  }

  let body;

  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return respond(400, {
      success: false,
      error: "Invalid submission."
    });
  }

  const payload = getPayload(body);

  if (payload.honeypot) {
    return respond(200, { success: true });
  }

  if (!payload.fullName || !payload.email || !payload.whatsapp) {
    return respond(400, {
      success: false,
      error: "Full name, email, and WhatsApp are required."
    });
  }

  if (!payload.preferredNextStep) {
    return respond(400, {
      success: false,
      error: "Please select how you would prefer us to proceed."
    });
  }

  if (
    payload.preferredNextStep === "Communicate with Me Directly" &&
    !payload.preferredCommunication
  ) {
    return respond(400, {
      success: false,
      error: "Please select your preferred communication method."
    });
  }

  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.error("Missing GHL_API_TOKEN or GHL_LOCATION_ID.");

    return respond(500, {
      success: false,
      error: "The secure form connection is not configured yet."
    });
  }

  try {
    const fieldIds = await resolveCustomFieldIds(locationId, token);

    const missingFields = Object.entries(fieldIds)
      .filter(([, id]) => !id)
      .map(([name]) => name);

    if (missingFields.length) {
      console.warn(
        "GHL custom fields not resolved:",
        missingFields.join(", ")
      );
    }

    const names = splitName(payload.fullName);
    const customFields = [];

    addCustomField(
      customFields,
      fieldIds.whatsapp,
      payload.whatsapp
    );

    addCustomField(
      customFields,
      fieldIds.preferredNextStep,
      payload.preferredNextStep
    );

    addCustomField(
      customFields,
      fieldIds.preferredCommunication,
      payload.preferredCommunication
    );

    addCustomField(
      customFields,
      fieldIds.strategicAreas,
      payload.strategicAreas
    );

    addCustomField(
      customFields,
      fieldIds.privateNote,
      payload.privateNote
    );

    addCustomField(
      customFields,
      fieldIds.officeContactName,
      payload.officeContactName
    );

    addCustomField(
      customFields,
      fieldIds.officeContactTitle,
      payload.officeContactTitle
    );

    addCustomField(
      customFields,
      fieldIds.officeContactEmail,
      payload.officeContactEmail
    );

    addCustomField(
      customFields,
      fieldIds.officeContactPhone,
      payload.officeContactPhone
    );

    const upsertBody = {
      locationId,
      firstName: names.firstName,
      lastName: names.lastName,
      email: payload.email,
      phone: payload.whatsapp,
      source: "JT Foxx Egypt 2026 — Private Executive Coordination",
      customFields
    };

    const upsertData = await ghlFetch(
      "/contacts/upsert",
      token,
      {
        method: "POST",
        body: JSON.stringify(upsertBody)
      }
    );

    const contactId =
      (upsertData.contact && upsertData.contact.id) ||
      upsertData.contactId ||
      upsertData.id;

    if (!contactId) {
      console.error(
        "GHL upsert succeeded but returned no contact ID:",
        upsertData
      );

      return respond(502, {
        success: false,
        error:
          "The response was saved incompletely. Please contact the Executive VIP Office."
      });
    }

    await ghlFetch(
      `/contacts/${encodeURIComponent(contactId)}/tags`,
      token,
      {
        method: "POST",
        body: JSON.stringify({
          tags: [RESPONSE_TAG]
        })
      }
    );

    return respond(200, {
      success: true,
      contactId
    });

  } catch (err) {
    console.error(
      "VIP form GHL error:",
      err.status || "",
      err.data
        ? JSON.stringify(err.data)
        : err.message
    );

    return respond(502, {
      success: false,
      error:
        "We were unable to securely save your response. Please try again."
    });
  }
};
