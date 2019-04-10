(async function () {
    const axios = require('axios')
    const flex = require('./flex.json')

    console.log(process.env)

    const {
        DRONE_REPO_NAME,
        DRONE_COMMIT_MESSAGE,
        DRONE_COMMIT_BRANCH,
        DRONE_BUILD_EVENT,
        DRONE_COMMIT_AUTHOR,
        CI_BUILD_NUMBER,
        DRONE_BUILD_STATUS,
        DRONE_COMMIT_LINK,
        PLUGIN_ACCESS_TOKEN,
        PLUGIN_TO,
        DRONE_BUILD_NUMBER
    } = process.env

    flex.contents.body.contents[1].text = DRONE_REPO_NAME
    flex.contents.body.contents[2].text = DRONE_COMMIT_MESSAGE
    flex.contents.body.contents[4].contents[0].contents[1].text = DRONE_COMMIT_BRANCH
    flex.contents.body.contents[4].contents[1].contents[1].text = DRONE_BUILD_EVENT
    flex.contents.body.contents[4].contents[2].contents[1].text = DRONE_COMMIT_AUTHOR
    flex.contents.body.contents[4].contents[3].contents[1].text = CI_BUILD_NUMBER || DRONE_BUILD_NUMBER
    flex.contents.body.contents[4].contents[4].contents[1].text = DRONE_BUILD_STATUS
    flex.contents.body.contents[4].contents[4].contents[1].color = DRONE_BUILD_STATUS === 'success' ? '#33aa55' : '#cc3d33'
    flex.contents.body.contents[5].contents[0].action.uri = DRONE_COMMIT_LINK

    await axios.post('https://api.line.me/v2/bot/message/push',
        {
            'to': PLUGIN_TO,
            'messages': [ flex ]
        },
        {
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PLUGIN_ACCESS_TOKEN}`
            }
        }
    ).catch(err => console.log(err))
})()
