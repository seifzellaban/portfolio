import { doc } from "../lib/google-sheets";

// Define a minimal shape for the error to avoid using 'any' (optional, but safer)
interface GoogleSheetsError {
  response?: {
    status: number;
  };
}

async function setupSheets() {
  try {
    await doc.loadInfo();
    console.log(`Loaded doc: ${doc.title}`);

    const requiredSheets = [
      {
        title: "Contact Form",
        headerValues: ["Date", "Name", "Email", "Message"],
      },
      { title: "Newsletter Signup", headerValues: ["Date", "Email"] },
    ];

    for (const req of requiredSheets) {
      let sheet = doc.sheetsByTitle[req.title];
      if (!sheet) {
        console.log(`Creating sheet: ${req.title}`);
        sheet = await doc.addSheet({ title: req.title });
      } else {
        console.log(`Sheet exists: ${req.title}`);
      }

      await sheet.loadHeaderRow();
      // simple check if headers are set, if not set them
      // Note: this might overwrite if row 1 is empty
      try {
        await sheet.setHeaderRow(req.headerValues);
        console.log(`Headers updated for: ${req.title}`);
      } catch {
        console.log(
          `Could not update headers for ${req.title} (might already have data/headers)`,
        );
      }
    }

    console.log("Sheets setup complete!");
  } catch (e: unknown) {
    const error = e as GoogleSheetsError;

    if (error.response && error.response.status === 403) {
      console.error("\nERROR: Permission Denied (403).");
      console.error(
        "Please share the Google Sheet with the service account email:",
      );
      console.error("mail-man@portfolio-479714.iam.gserviceaccount.com\n");
    } else {
      console.error("An error occurred:", error);
    }
  }
}

setupSheets();
