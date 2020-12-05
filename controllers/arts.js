const Art = require('../models/art');

module.exports.index = async (req, res) => {
    const arts = await Art.find({});
    res.render('arts/index', { arts })
}

module.exports.renderNewForm = (req,res) => {
    res.render('arts/new');
}

module.exports.createArt = async (req, res, next) => {
    const art = new Art(req.body.art);
    art.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    art.author = req.user._id;
    await art.save();
    console.log(art);
    req.flash('success', 'Successfully added a new painting!');
    res.redirect(`/arts/${art._id}`)
}

module.exports.showArt = async(req,res,) => {
    const art = await Art.findById(req.params.id).populate('author');
    if(!art){
        req.flash('error', 'Cannot find that painting!');
        return res.redirect('/arts');
    }
    res.render('arts/show', { art });
}

module.exports.renderEditForm = async(req, res) => {
    const {id} = req.params;
    const art = await Art.findById(id)
    if(!art){
        req.flash('error', 'Cannot find that painting!');
        return res.redirect('/arts');
    }
    res.render('arts/edit', { art });
}

module.exports.updateArt = async (req, res) => {
    const { id } = req.params;
    const art = await Art.findByIdAndUpdate(id, { ...req.body.arts });
    req.flash('success', 'Successfully updated painting!');
    res.redirect(`/arts/${art._id}`)
}

module.exports.deleteArt = async(req, res) => {
    const { id } = req.params;
    await Art.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted painting!')
    res.redirect('/arts');
}