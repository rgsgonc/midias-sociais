var moment = require('moment');

module.exports = function(app) {
    var webdriver = require('selenium-webdriver'),
        By = webdriver.By,
        until = webdriver.until;

    app.get('/', function(req, res) {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

        driver.get('https://www.instagram.com/kadalsasso/');
        driver.executeScript(function() {
            return window._sharedData.entry_data.ProfilePage[0].user;
        }).then(resultado => {
            console.log(JSON.stringify(resultado));


            let posts = resultado.media.nodes;
            
            let lastFivePosts = [];
            let comentarios = [];
            let qtdComentariosArray = [];
            let dataComentarios = [];
            let likes = [];
            let imagem150x150 = [];

            for (let i = 0; i <= 4; i ++) {
                lastFivePosts.push(posts[i].display_src);
                comentarios.push(posts[i].caption);
                qtdComentariosArray.push(posts[i].comments.count);
                dataComentarios.push(moment(new Date(posts[i].date)).format('HH:mm:ss'));
                likes.push(posts[i].likes.count);
                imagem150x150.push(posts[i].thumbnail_resources[0].src);
            }
            
            var dados = {
                seguidores: resultado.followed_by.count, 
                seguindo: resultado.follows.count,
                nome: resultado.full_name,
                publicacoes: resultado.media.count,
                imagem160x160 : resultado.profile_pic_url,
                biografia: resultado.biography,
                usuario: resultado.username, 
                comentarios: resultado.media.nodes.caption,
                url_externa: resultado.external_url,
                foto: resultado.media.nodes.display_src,
                lastFivePosts: lastFivePosts,
                comentarios: comentarios,
                qtdComentariosArray: qtdComentariosArray,
                dataComentarios: dataComentarios,
                likes:likes,
                bloqueado: resultado.is_private,
                imagem150x150:imagem150x150
            };
                res.render('pages/profile', {dados});
        });
    });
}
