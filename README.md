## Website of the festival "24 HEURES DE L'INSA"

###Requirements
- node.js
- npm

###Installation
- Fork or clone the project
- Lauch the command ``npm install``
- Rename the three configuration json files from the directory ``/config``.
    Just remove the extension '-dist' and complete with the secret informations (password, api key, jwt)
- Run the project ``npm run dev``
- Go to ``http://localhost:3000``

###Make a change
- Make sure the code is up to date
    - ``git pull``
- Create a branch before making a change
    - ``git branch "NameOfYourBrach"``
    - ``git checkout "NameOfYourBrach"``
- Update the files you want
- Commit your changes
    - ``git add .``
    - ``git commit -m "Your message"``
- Send your changes
    - ``git push``
    - ``git checkout master``