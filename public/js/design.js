
//hamburger button 
document.querySelector("body > div.ui.pointing.menu.stackable > div.hamburger").addEventListener("click", function(e) { 
    $menu = $(this).parent();
    if(!$(this).hasClass('active')) {
        $(this).addClass('active');
        $menu.addClass('open');
    } else {
        $(this).removeClass('active');
        $menu.removeClass('open');
    }
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {

    const themeStylesheet = document.getElementById('theme');
    const storedTheme = localStorage.getItem('theme');
    if(storedTheme){
        themeStylesheet.href = storedTheme;
    }
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        // if it's light -> go dark
        if(themeStylesheet.href.includes('light')){
            themeStylesheet.href = '/css/dark-theme.css';
            themeToggle.innerHTML = '<i class="fa fa-sun-o fa-lg"></i>';
        } else {
            // if it's dark -> go light
            themeStylesheet.href = '/css/light-theme.css';
            themeToggle.innerHTML = '<i class="fa fa-moon-o fa-lg"></i>';
        }
        // save the preference to localStorage
        localStorage.setItem('theme',themeStylesheet.href)  
    })
})