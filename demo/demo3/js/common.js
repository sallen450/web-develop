/**
 * Created by jiqinghua on 15/6/17.
 */

function $( id ) {
    return document.getElementById(id);
}

$('my-fav').onclick = function( e ) {
    $('my-game').style.display = 'block';
    $('friend-game').style.display = 'none';

    e.preventDefault();
};


$('friend-fav').onclick = function( e ) {
    $('friend-game').style.display = 'block';
    $('my-game').style.display = 'none';

    e.preventDefault();
};

var downloads = document.querySelectorAll('.download');

for (var i = 0; i < downloads.length; i++) {
    downloads[i].onmousedown = function () {
        this.classList.toggle('press');
    };

    downloads[i].onmouseup = function () {
        this.classList.toggle('press');
    };
}