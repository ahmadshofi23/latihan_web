const Post = require('../models/Post');

module.exports = {
    index: async(req, res) => {
        const posts = await Post.findAll();

        return res.render('post/index', {
            posts,
        });
    },

    create: async(req, res) => {
        return res.render('post/create');
    },

    store: async(req, res) => {
        await Post.create({
            title: req.body.title,
            content: req.body.content,
        });

        return res.redirect('/posts');
    },

    delete: async(req, res) => {
        const id = req.params.id;
        await Post.destroy({
            where: {
                id: id,
            },
        });

        return res.redirect('/posts');
    },

    change: async(req, res) => {
        const id = req.params.id;
        const postById =
            await Post.findOne({
                where: { id: id }
            })
        return res.render('post/edit', {
            postById,
        });
    },
    edit: async(req, res) => {
      await Post.update({
          title: req.body.title,
          content: req.body.content,
      },
      {
        where: { 
          id: req.body.id,
        }
      });

      return res.redirect('/posts');
  },

}