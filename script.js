let open = false;

function toggleMenu() {
    open = !open;
    requestAnimationFrame(() => {
        document.getElementById('ham').classList.toggle('open', open);
        document.getElementById('mobileNav').classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });
}

function closeMenu() {
    open = false;
    document.getElementById('ham').classList.remove('open');
    document.getElementById('mobileNav').classList.remove('open');
    document.body.style.overflow = '';
}