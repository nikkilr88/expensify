import moment from 'moment'

export default [
  {
    id: '1',
    description: 'rent',
    amount: 150000,
    note: '',
    createdAt: moment(0).valueOf()
  },
  {
    id: '2',
    description: 'tea',
    amount: 1000,
    note: '',
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf()
  },
  {
    id: '3',
    description: 'course',
    amount: 13500,
    note: 'udemy',
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf()
  }
]
