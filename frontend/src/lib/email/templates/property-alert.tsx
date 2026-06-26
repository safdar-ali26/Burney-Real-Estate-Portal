import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PropertyAlertEmailProps {
  name?: string;
  propertyTitle: string;
  propertyLocation?: string;
  propertyPrice?: string;
  propertyType?: string;
  bedrooms?: string;
  propertyUrl?: string;
}

export default function PropertyAlertEmail({
  name = "there",
  propertyTitle,
  propertyLocation = "Dubai, UAE",
  propertyPrice = "Price on Request",
  propertyType = "Property",
  bedrooms = "-",
  propertyUrl = "https://burneyrealestate.com",
}: PropertyAlertEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New property recommendation from Burney Real Estate</Preview>

      <Body style={body}>
        <Container style={container}>
          <Section style={brandBox}>
            <Text style={brandSmall}>Burney Real Estate</Text>
            <Heading style={brandTitle}>New Property Match</Heading>
          </Section>

          <Section style={card}>
            <Text style={greeting}>Hi {name},</Text>

            <Text style={paragraph}>
              We found a property that may match your saved preferences.
            </Text>

            <Section style={propertyBox}>
              <Text style={propertyTag}>{propertyType}</Text>

              <Heading style={propertyTitleStyle}>{propertyTitle}</Heading>

              <Text style={propertyLocationStyle}>{propertyLocation}</Text>

              <Section style={detailsBox}>
                <InfoItem label="Price" value={propertyPrice} />
                <InfoItem label="Bedrooms" value={bedrooms} />
                <InfoItem label="Type" value={propertyType} />
              </Section>
            </Section>

            <Section style={buttonWrapper}>
              <Button href={propertyUrl} style={button}>
                View Property
              </Button>
            </Section>

            <Section style={noticeBox}>
              <Text style={noticeText}>
                This recommendation is based on your saved preferences. You can
                update your preferences anytime from your Burney Real Estate
                dashboard.
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

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Section style={infoItem}>
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

const propertyBox = {
  margin: "24px 0",
  padding: "22px",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
};

const propertyTag = {
  display: "inline-block",
  margin: "0 0 12px",
  padding: "6px 10px",
  backgroundColor: "rgba(235,203,76,0.12)",
  border: "1px solid rgba(235,203,76,0.28)",
  borderRadius: "999px",
  color: "#EBCB4C",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
};

const propertyTitleStyle = {
  margin: "0",
  color: "#FFFFFF",
  fontSize: "23px",
  lineHeight: "30px",
  fontWeight: "800",
};

const propertyLocationStyle = {
  margin: "10px 0 0",
  color: "#BDBDBD",
  fontSize: "14px",
  lineHeight: "22px",
};

const detailsBox = {
  marginTop: "20px",
};

const infoItem = {
  padding: "12px 0",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
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

const buttonWrapper = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#EBCB4C",
  color: "#000000",
  padding: "14px 24px",
  borderRadius: "14px",
  fontSize: "14px",
  fontWeight: "800",
  textDecoration: "none",
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