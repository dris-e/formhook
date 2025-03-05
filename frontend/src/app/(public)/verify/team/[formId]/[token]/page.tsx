import VerifyTeamContent from "./content";

export default async function VerifyTeamPage({ params }: { params: { formId: string; token: string } }) {
  const { formId, token } = await params;

  return <VerifyTeamContent formId={formId} token={token} />;
}
