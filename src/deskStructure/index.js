import S from "@sanity/desk-tool/structure-builder";

import about from "../../schemas/documents/about";
import home from "../../schemas/documents/home";

const documents = [about, home];
const documentIds = documents.map((a) => a.name);

const listItems = [];
for (const document of documents) {
  listItems.push(
    S.listItem()
      .title(document.title)
      .child(
        S.document()
          .title(document.title)
          .schemaType(document.name)
          .documentId(document.name)
      )
  );
}

console.log(listItems);
console.log(documentIds);

// build admin structure
export default () =>
  S.list()
    .title("Base")
    .items([
      ...listItems,
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => documentIds.indexOf(listItem.getId()) < 0
      ),
    ]);
