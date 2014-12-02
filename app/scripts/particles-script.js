/**
 * Created by Abdullah-Mac on 12/2/14.
 */
particlesJS('particles-js', {
    particles: {
        color: '#fff',
        shape: 'circle',
        opacity: 1,
        size: 3,
        size_random: true,
        nb: 100,
        line_linked: {
            enable_auto: true,
            distance: 250,
            color: '#fff',
            opacity: 0.5,
            width: 1,
            condensed_mode: {
                enable: false,
                rotateX: 600,
                rotateY: 600
            }
        },
        anim: {
            enable: true,
            speed: 2.5
        }
    },
    interactivity: {
        enable: true,
        mouse: {
            distance: 250
        },
        detect_on: 'canvas',
        mode: 'grab',
        line_linked: {
            opacity: 0.5
        },
        events: {
            onclick: {
                push_particles: {
                    enable: true,
                    nb: 4
                }
            }
        }
    },
    retina_detect: true
});
