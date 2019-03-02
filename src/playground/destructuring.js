const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
}

const { name: publisherName = 'Self-Published' } = book.publisher

console.log(publisherName)

const item = ['coffee', '$2.00', '$2.50', '$2.75']

const [itemName, , priceMd] = item

console.log(`A medium ${itemName} costs ${priceMd}`)
