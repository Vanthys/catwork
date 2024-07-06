# Catwork
Catwork is a micro social media platform for posting cat pics.
## Demo
[vanthys.duckdns.org/catwork/](https://vanthys.duckdns.org/catwork/)

## Installation
> [!NOTE]
> XAMPP Installation (apache, mysql) is required
> A node.js installation is optional

### install-script (requires node.js)
clone the repo and execute `install.ps1`. 

### Release
Download a release from Github and copy the entire content of the directory **directly into htdocs** NOT in a subdirectory

Choose one of the `SQL Scripts` to create your database.

### Database 
Choose a Database template
- [create_empty_db.sql](app/create_empty_db.sql) will give a you a completly empty database
- [catwork.sql](app/catwork.sql) already contains a few posts, and two users

and import it in the [webinterface of your xampp installation](http://localhost/phpmyadmin/)

## Techstack
- [PHP 8](https://www.youtube.com/watch?v=wLg04uu2j2o)
- [React](https://react.dev/)
- MySQL


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Disclaimer:** The author is not responsible for any copyrighted material uploaded to this project. Any copyrighted material should not be uploaded or used in violation of the respective copyright laws.