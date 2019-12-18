// From Dan's Guides:
// https://github.com/justsml/guides/tree/master/express/setup-guide

const router = module.exports = require('express').Router();

const items = [
    {
        id: '0',
        title: 'You Are Not a Gadget: A Manifesto',
        author: 'Jaron Lanier',
        cover_image: 'https://cybject.files.wordpress.com/2013/03/jaron.jpg'
    }, {
        id: '1',
        title: 'Radical Candor',
        author: 'Kim Scott',
        cover_image: 'https://images-na.ssl-images-amazon.com/images/I/411O8D1w2UL.jpg'
    }, {
        id: '2',
        title: 'Station Eleven',
        author: 'Emily St. John Mandel',
        cover_image: 'https://images-na.ssl-images-amazon.com/images/I/51-qQ2TbIPL._SX323_BO1,204,203,' +
                '200_.jpg'
    }, {
        id: '3',
        title: 'Just the Funny Parts',
        author: 'Nell Scovell',
        cover_image: 'https://i.harperapps.com/covers/9780062473509/y450-293.jpg'
    }, {
        id: '4',
        title: 'Wave: A Memoir of Life After the Tsunami',
        author: 'Sonali Deraniyagala',
        cover_image: 'https://images-na.ssl-images-amazon.com/images/I/31sWoadXnhL.jpg'
    }
]

router.get('/', getAll)
router.get('/:id', getOne)

function getAll(req, res, next) {
    res.json({data: items})
}

function getOne(req, res, next) {
    const item = items.find(item => item.id === req.params.id)
    if (!item) 
        return next({status: 404, message: 'Item not found.'})
    res
        .status(200)
        .json({data: item})
}