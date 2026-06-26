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

interface ForgotPasswordEmailProps {
  name: string;
  resetUrl: string;
  expiryMinutes?: number;
}

export default function ForgotPasswordEmail({
  name,
  resetUrl,
  expiryMinutes = 15,
}: ForgotPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Burney Real Estate password</Preview>

      <Body style={body}>
        <Container style={container}>
          <Section style={brandBox}>
            <Text style={brandSmall}>Burney Real Estate</Text>
            <Heading style={brandTitle}>Reset Your Password</Heading>
          </Section>

          <Section style={card}>
            <Text style={greeting}>Hi {name || "there"},</Text>

            <Text style={paragraph}>
              We received a request to reset your Burney Real Estate account
              password. Click the button below to create a new password.
            </Text>

            <Section style={buttonWrapper}>
              <Button href={resetUrl} style={button}>
                Reset Password
              </Button>
            </Section>

            <Text style={paragraph}>
              This reset link will expire in{" "}
              <strong>{expiryMinutes} minutes</strong>.
            </Text>

            <Section style={noticeBox}>
              <Text style={noticeText}>
                If you did not request this password reset, you can safely
                ignore this email. Your password will remain unchanged.
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
  backgroundColor: "rgba(255,255,255,0.05)",
  borderRadius: "16px",
};

const noticeText = {
  margin: "0",
  color: "#AFAFAF",
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