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

interface WelcomeEmailProps {
  name: string;
  dashboardUrl?: string;
}

export default function WelcomeEmail({
  name,
  dashboardUrl = "https://burneyrealestate.com/dashboard",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Burney Real Estate Portal</Preview>

      <Body style={body}>
        <Container style={container}>
          <Section style={hero}>
            <Text style={brandSmall}>Burney Real Estate</Text>
            <Heading style={heroTitle}>Welcome to Your Property Portal</Heading>
            <Text style={heroSubtitle}>
              Your account has been created successfully.
            </Text>
          </Section>

          <Section style={card}>
            <Text style={greeting}>Hi {name || "there"},</Text>

            <Text style={paragraph}>
              Welcome to Burney Real Estate. Your account is now active. You can
              save favourite properties, compare listings, manage preferences,
              and track property opportunities from your personal dashboard.
            </Text>

            <Section style={featuresGrid}>
              <Feature title="Save Properties" text="Keep your favourite listings organized." />
              <Feature title="Compare Listings" text="Compare prices, sizes and locations." />
              <Feature title="Smart Preferences" text="Receive recommendations based on your needs." />
            </Section>

            <Section style={buttonWrapper}>
              <Button href={dashboardUrl} style={button}>
                Open Dashboard
              </Button>
            </Section>

            <Section style={noticeBox}>
              <Text style={noticeText}>
                If you have any questions, our Burney Real Estate team is ready
                to assist you.
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

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <Section style={featureCard}>
      <Text style={featureTitle}>{title}</Text>
      <Text style={featureText}>{text}</Text>
    </Section>
  );
}

const body = {
  margin: "0",
  padding: "0",
  backgroundColor: "#0B0B0B",
  fontFamily:
    "Arial, Helvetica, sans-serif",
};

const container = {
  width: "100%",
  maxWidth: "640px",
  margin: "0 auto",
  padding: "40px 20px",
};

const hero = {
  textAlign: "center" as const,
  padding: "34px 24px",
  backgroundColor: "#141414",
  border: "1px solid rgba(235,203,76,0.25)",
  borderRadius: "24px 24px 0 0",
};

const brandSmall = {
  margin: "0",
  color: "#EBCB4C",
  fontSize: "13px",
  fontWeight: "700",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
};

const heroTitle = {
  margin: "12px 0 0",
  color: "#FFFFFF",
  fontSize: "30px",
  lineHeight: "38px",
  fontWeight: "800",
};

const heroSubtitle = {
  margin: "12px 0 0",
  color: "#CFCFCF",
  fontSize: "15px",
  lineHeight: "24px",
};

const card = {
  backgroundColor: "#101010",
  borderRight: "1px solid rgba(235,203,76,0.25)",
  borderBottom: "1px solid rgba(235,203,76,0.25)",
  borderLeft: "1px solid rgba(235,203,76,0.25)",
  borderRadius: "0 0 24px 24px",
  padding: "34px",
};

const greeting = {
  margin: "0 0 18px",
  color: "#FFFFFF",
  fontSize: "17px",
  fontWeight: "700",
};

const paragraph = {
  margin: "0 0 24px",
  color: "#CFCFCF",
  fontSize: "15px",
  lineHeight: "25px",
};

const featuresGrid = {
  margin: "24px 0",
};

const featureCard = {
  marginBottom: "12px",
  padding: "16px",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
};

const featureTitle = {
  margin: "0",
  color: "#EBCB4C",
  fontSize: "14px",
  fontWeight: "800",
};

const featureText = {
  margin: "6px 0 0",
  color: "#BDBDBD",
  fontSize: "13px",
  lineHeight: "20px",
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