module.exports = function(app) {
    var webdriver = require('selenium-webdriver'),
        By = webdriver.By,
        until = webdriver.until;

    app.get('/', function(req, res) {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

        driver.get('https://www.instagram.com/ativarinformatica/');
        driver.executeScript(function() {
            return window._sharedData.entry_data.ProfilePage[0].user;
        }).then(resultado => {
            console.log(JSON.stringify(resultado));

            let posts = resultado.media.nodes;
            
            let lastFivePosts = [];

            for (let i = 0; i <= 4; i ++) {
                lastFivePosts.push(posts[i].display_src);
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
                lastFivePosts: lastFivePosts
            };

            res.render('pages/profile', {dados});

        });
    });
}
