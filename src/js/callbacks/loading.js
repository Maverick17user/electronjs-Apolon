const loading = props => {
    switch (props) {
        case 'start':
            let loader = document.createElement('aside')
            loader.innerHTML = `
                <div class="cssload-loader">
                    <div class="cssload-inner cssload-one"></div>
                    <div class="cssload-inner cssload-two"></div>
                    <div class="cssload-inner cssload-three"></div>
                </div>
            `
            content.appendChild(loader)
            break;
        case 'stop':
            document.querySelector('aside').remove()
            break;
    }
}

module.exports = loading