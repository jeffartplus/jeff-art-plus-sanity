import {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case `artist`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "artWork" && references($id)]`,
            params: ({document}) => {
              const id = document.displayed._id?.replace('drafts.', '')
              return {id}
            },
            options: {perspective: 'previewDrafts'},
          })
          .title('Obras de arte'),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "exhibition" && references($id)]`,
            params: ({document}) => {
              const id = document.displayed._id?.replace('drafts.', '')
              return {id}
            },
            options: {perspective: 'previewDrafts'},
          })
          .title('Exposiciones'),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "conversation" && references($id)]`,
            params: ({document}) => {
              const id = document.displayed._id?.replace('drafts.', '')
              return {id}
            },
            options: {perspective: 'previewDrafts'},
          })
          .title('Conversatorios'),
      ])
  }
}
