function Footer()
{
    let getYear = () => {
        let currentYear = new Date().getFullYear();
        return currentYear;
    };
    return(
        <div className="Footer footer-copyright text-center py-3">© {getYear()} Copyright:
        <a href="mrgreaseFooter.github.io"> Spriter!</a>
    </div>
    )
}

export default Footer;