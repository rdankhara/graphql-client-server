> Sample getAllBook query `
> query AllBooks {
getAllBooks {
author
id
pages
}
} 
`

> Sample mutation query `mutation CreateBook {
createBook (title: "Game Of Throne", author: "Jane", pages:700) {
id
title
author
pages
}
}`

> Sample mutation Update query `mutation UpdateBook {
updateBook (bookInput:{title:"Lord Of Ring", author:"John Ronald", pages:1000}) {
id
title
author
pages
}
}`
