import {CreateFormState} from "./formFields";

export const submitActionFactory = ( fn: (bookState: CreateFormState) => Promise<void>) => async (prevData: CreateFormState, formData: FormData) => {
    const title = formData.get('title').toString() ?? '';
    const author: string = formData.get('author')?.toString() ?? '';
    const pages = +formData.get('pages');
    const errors = [];
    const book: CreateFormState = {
        title, author, pages, errors
    }
    if (!title || !author || !pages) {
        book.errors.push('All fields title, author and pages are required to create a book');
        return book;
    }
    await fn(book);
}
