(function(html) {

    const sstabs = function(nextTab = false) {

        const tabList = document.querySelector('.tab-nav__list');
        const tabPanels = document.querySelectorAll('.tab-content__item');
        const tabItems = document.querySelectorAll('.tab-nav__list li');
        const tabLinks = [];

        if (!(tabList && tabPanels)) return;

        const tabClickEvent = function(tabLink, tabLinks, tabPanels, linkIndex, e) {

            // Reset all the tablinks
            tabLinks.forEach(function(link) {
                link.setAttribute('tabindex', '-1');
                link.setAttribute('aria-selected', 'false');
                link.parentNode.removeAttribute('data-tab-active');
                link.removeAttribute('data-tab-active');
            });

            // set the active link attributes
            tabLink.setAttribute('tabindex', '0');
            tabLink.setAttribute('aria-selected', 'true');
            tabLink.parentNode.setAttribute('data-tab-active', '');
            tabLink.setAttribute('data-tab-active', '');

            // Change tab panel visibility
            tabPanels.forEach(function(panel, index) {
                if (index != linkIndex) {
                    panel.setAttribute('aria-hidden', 'true');
                    panel.removeAttribute('data-tab-active');
                } else {
                    panel.setAttribute('aria-hidden', 'false');
                    panel.setAttribute('data-tab-active', '');
                }
            });

            window.dispatchEvent(new Event("resize"));

        };

        // Add accessibility roles and labels
        tabList.setAttribute('role', 'tablist');
        tabItems.forEach(function(item, index) {

            let link = item.querySelector('a');

            // collect tab links
            tabLinks.push(link);
            item.setAttribute('role', 'presentation');

            if (index == 0) {
                item.setAttribute('data-tab-active', '');
            }

        });

        // Set up tab links
        tabLinks.forEach(function(link, i) {
            let anchor = link.getAttribute('href').split('#')[1];
            let attributes = {
                'id': 'tab-link-' + i,
                'role': 'tab',
                'tabIndex': '-1',
                'aria-selected': 'false',
                'aria-controls': anchor
            };

            // if it's the first element update the attributes
            if (i == 0) {
                attributes['aria-selected'] = 'true';
                attributes.tabIndex = '0';
                link.setAttribute('data-tab-active', '');
            };

            // Add the various accessibility roles and labels to the links
            for (var key in attributes) {
                link.setAttribute(key, attributes[key]);
            }

            // Click Event Listener
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });

            // Click Event Listener
            link.addEventListener('focus', function(e) {
                tabClickEvent(this, tabLinks, tabPanels, i, e);
            });

            // Keyboard event listener
            link.addEventListener('keydown', function(e) {
                keyboardEvent(link, tabLinks, tabPanels, tabItems, i, e);
            });
        });

        // Set up tab panels
        tabPanels.forEach(function(panel, i) {

            let attributes = {
                'role': 'tabpanel',
                'aria-hidden': 'true',
                'aria-labelledby': 'tab-link-' + i
            };

            if (nextTab) {
                let nextTabLink = document.createElement('a');
                let nextTabLinkIndex = (i < tabPanels.length - 1) ? i + 1 : 0;

                // set up next tab link
                nextTabLink.setAttribute('href', '#tab-link-' + nextTabLinkIndex);
                nextTabLink.textContent = 'Next Tab';
                panel.appendChild(nextTabLink);
            }

            if (i == 0) {
                attributes['aria-hidden'] = 'false';
                panel.setAttribute('data-tab-active', '');
            }

            for (let key in attributes) {
                panel.setAttribute(key, attributes[key]);
            }
        });
    };




    (function ssInit() {

        sstabs();
    })();

})(document.documentElement);