import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface LeadAlertEmailProps {
  agentName?: string;
  leadName: string;
  leadPhone: string;
  leadEmail?: string;
  propertyTitle?: string;
  source?: string;
  message?: string;
}

export default function LeadAlertEmail({
  agentName = "Agent",
  leadName,
  leadPhone,
  leadEmail,
  propertyTitle,
  source = "Website",
  message,
}: LeadAlertEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New lead assigned from Burney Real Estate Portal</Preview>

      <Body style={body}>
        <Container style={container}>
          <Section style={brandBox}>
            <Text style={brandSmall}>Burney Real Estate</Text>
            <Heading style={brandTitle}>New Lead Assigned</Heading>
          </Section>

          <Section style={card}>
            <Text style={greeting}>Hi {agentName},</Text>

            <Text style={paragraph}>
              A new lead has been assigned to you from the Burney Real Estate
              Portal.
            </Text>

            <Section style={leadBox}>
              <InfoRow label="Lead Name" value={leadName} />
              <InfoRow label="Phone" value={leadPhone} />
              <InfoRow label="Email" value={leadEmail || "-"} />
              <InfoRow label="Property" value={propertyTitle || "-"} />
              <InfoRow label="Source" value={source} />
            </Section>

            {message ? (
              <Section style={messageBox}>
                <Text style={messageTitle}>Client Message</Text>
                <Text style={messageText}>{message}</Text>
              </Section>
            ) : null}

            <Section style={noticeBox}>
              <Text style={noticeText}>
                Please contact this lead as soon as possible and update the lead
                status in the portal.
              </Text>
            </Section>

            <Hr style={divider} />

            <Text style={footer}>
              © Burney Real Estate LLC · Dubai, United Arab Emirates
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Section style={infoRow}>
      <Text style={infoLabel}>{label}</Text>
      <Text style={infoValue}>{value}</Text>
    </Section>
  );
}

const body = {
  margin: "0",
  padding: "0",
  backgroundColor: "#0B0B0B",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const container = {
  width: "100%",
  maxWidth: "620px",
  margin: "0 auto",
  padding: "40px 20px",
};

const brandBox = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const brandSmall = {
  margin: "0",
  color: "#EBCB4C",
  fontSize: "13px",
  fontWeight: "700",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
};

const brandTitle = {
  margin: "10px 0 0",
  color: "#FFFFFF",
  fontSize: "30px",
  lineHeight: "38px",
  fontWeight: "800",
};

const card = {
  backgroundColor: "#141414",
  border: "1px solid rgba(235,203,76,0.25)",
  borderRadius: "24px",
  padding: "34px",
};

const greeting = {
  margin: "0 0 18px",
  color: "#FFFFFF",
  fontSize: "17px",
  fontWeight: "700",
};

const paragraph = {
  margin: "0 0 22px",
  color: "#CFCFCF",
  fontSize: "15px",
  lineHeight: "25px",
};

const leadBox = {
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "18px",
  padding: "16px",
  margin: "24px 0",
};

const infoRow = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  padding: "10px 0",
};

const infoLabel = {
  margin: "0",
  color: "#8E8E8E",
  fontSize: "12px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const infoValue = {
  margin: "4px 0 0",
  color: "#FFFFFF",
  fontSize: "15px",
  fontWeight: "700",
};

const messageBox = {
  marginTop: "20px",
  padding: "16px",
  backgroundColor: "rgba(235,203,76,0.08)",
  border: "1px solid rgba(235,203,76,0.18)",
  borderRadius: "16px",
};

const messageTitle = {
  margin: "0",
  color: "#EBCB4C",
  fontSize: "13px",
  fontWeight: "800",
};

const messageText = {
  margin: "8px 0 0",
  color: "#CFCFCF",
  fontSize: "14px",
  lineHeight: "22px",
};

const noticeBox = {
  marginTop: "10px",
  padding: "16px",
  backgroundColor: "rgba(235,203,76,0.08)",
  border: "1px solid rgba(235,203,76,0.18)",
  borderRadius: "16px",
};

const noticeText = {
  margin: "0",
  color: "#CFCFCF",
  fontSize: "13px",
  lineHeight: "21px",
};

const divider = {
  borderColor: "rgba(255,255,255,0.08)",
  margin: "28px 0 18px",
};

const footer = {
  margin: "0",
  color: "#777777",
  fontSize: "12px",
  textAlign: "center" as const,
};