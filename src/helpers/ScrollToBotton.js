import { animateScroll } from 'react-scroll'

export const scrollToBottom = (id) => {

    const div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;

}

export const scrollToBottomAnimated = (id) => {

    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250,
        delay: 100,
        smooth: 'easeInOutQuint'
    })

}
