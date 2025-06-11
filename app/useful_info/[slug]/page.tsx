import UsefulInfoPage from "../page";
import UsefulInfoLayout from "../usefulinfo-layout";

export default async function Page() {

  return (
    <UsefulInfoLayout >
      <UsefulInfoPage />
    </UsefulInfoLayout>
  );
}