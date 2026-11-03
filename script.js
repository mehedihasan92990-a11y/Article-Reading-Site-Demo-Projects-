
/* =========================================================
   OBSIDIAN PRO
   Premium Article Reading Website
   Main JavaScript
========================================================= */


/* =========================================================
   01. GLOBAL CONFIGURATION
========================================================= */

"use strict";

const CONFIG = {
    siteName: "Obsidian Pro",
    version: "1.0.0",
    defaultTheme: "dark",
    defaultFontSize: 18,
    defaultLineHeight: 1.8,
    articlesPerPage: 6,
    searchDelay: 250,
    toastDuration: 3000
};
alert("Welcome to OBSIDIAN PRO!");

/* =========================================================
   02. DOM ELEMENT SELECTOR
========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return Array.from(parent.querySelectorAll(selector));
};

const elements = {
    body: document.body,

    loader: $("#pageLoader"),
    header: $("#mainHeader"),

    mobileMenuButton: $(".mobile-menu-toggle"),
    mobileNavigation: $("#mobileNavigation"),

    searchOpen: $(".search-open"),
    searchClose: $(".search-close"),
    searchOverlay: $("#searchOverlay"),
    searchInput: $("#globalSearch"),
    searchResults: $("#searchResults"),

    themeToggle: $(".theme-toggle"),

    categoryFilters: $("#categoryFilters"),
    articleGrid: $("#articleGrid"),
    articleSort: $("#articleSort"),
    loadMoreButton: $("#loadMoreButton"),

    reader: $("#reader"),
    readerBack: $("#readerBack"),
    readerTitle: $("#readerTitle"),
    readerSubtitle: $("#readerSubtitle"),
    readerCategory: $("#readerCategory"),
    readerAuthor: $("#readerAuthor"),
    readerDate: $("#readerDate"),
    readerCover: $("#readerCover"),
    readerBody: $("#readerBody"),

    readerProgress: $("#readerProgress"),
    readingPercentage: $("#readingPercentage"),
    miniProgressFill: $("#miniProgressFill"),

    readerBookmark: $("#readerBookmark"),
    readerShare: $("#readerShare"),

    fontSizeControl: $("#fontSizeControl"),
    lineHeightControl: $("#lineHeightControl"),
    readerResetSettings: $("#readerResetSettings"),

    loginModal: $("#loginModal"),
    registerModal: $("#registerModal"),

    newsletterForm: $("#newsletterForm"),
    newsletterMessage: $("#newsletterMessage"),

    toastContainer: $("#toastContainer"),
    toastMessage: $("#toastMessage"),
    toastText: $("#toastText"),

    backToTop: $("#backToTop")
};


/* =========================================================
   03. STORAGE MANAGER
========================================================= */

const Storage = {

    get(key, fallback = null) {

        try {

            const value = localStorage.getItem(key);

            return value === null
                ? fallback
                : JSON.parse(value);

        } catch (error) {

            console.error("Storage read error:", error);

            return fallback;

        }

    },


    set(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error("Storage write error:", error);

            return false;

        }

    },


    remove(key) {

        try {

            localStorage.removeItem(key);

        } catch (error) {

            console.error("Storage remove error:", error);

        }

    }

};


/* =========================================================
   04. APPLICATION STATE
========================================================= */

const AppState = {

    theme: Storage.get(
        "obsidian-theme",
        CONFIG.defaultTheme
    ),

    activeCategory: "all",

    searchQuery: "",

    currentArticle: null,

    currentPage: 1,

    bookmarks: Storage.get(
        "obsidian-bookmarks",
        []
    ),

    readingHistory: Storage.get(
        "obsidian-history",
        []
    ),

    user: Storage.get(
        "obsidian-user",
        null
    ),

    fontSize: Storage.get(
        "obsidian-font-size",
        CONFIG.defaultFontSize
    ),

    lineHeight: Storage.get(
        "obsidian-line-height",
        CONFIG.defaultLineHeight
    )

};


/* =========================================================
   05. ARTICLE DATABASE
========================================================= */

const Articles = [

    {
        id: 1,

        title: "The Future of Intelligence: Beyond Artificial Minds",

        subtitle: "Exploring the relationship between human creativity and intelligent machines.",

        category: "technology",

        author: "James Davidson",

        authorInitials: "JD",

        date: "October 28, 2026",

        timestamp: 1793145600000,

        readTime: 8,

        views: 12450,

        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200",

        excerpt: "Exploring how intelligent systems are changing the boundaries of human knowledge and creativity.",

        tags: [
            "Technology",
            "Artificial Intelligence",
            "Future"
        ],

        content: `
            <p class="reader-lead">
                Every major technological transformation begins
                with a question. What if the way we understand
                the world could be different?
            </p>

            <h2 id="article-1-section-1">
                The Beginning of a New Era
            </h2>

            <p>
                Throughout history, human beings have developed
                tools to extend their abilities. From the invention
                of writing to the development of computers, every
                innovation has changed the way we communicate,
                learn and understand our surroundings.
            </p>

            <p>
                Artificial intelligence represents another
                significant chapter in this ongoing journey.
                It challenges us to reconsider not only what
                machines can do, but also what makes human
                thinking unique.
            </p>

            <blockquote>
                The real value of knowledge is not simply in
                what we know, but in how we use it to understand
                the unknown.
            </blockquote>

            <h2 id="article-1-section-2">
                The Human Perspective
            </h2>

            <p>
                Human intelligence is shaped by experiences,
                emotions, curiosity and the ability to connect
                seemingly unrelated ideas.
            </p>

            <p>
                As technology continues to develop, the
                relationship between human judgment and
                computational ability becomes increasingly
                important.
            </p>

            <h2 id="article-1-section-3">
                What Comes Next?
            </h2>

            <p>
                The future will not be determined by technology
                alone. It will also depend on the questions
                we choose to ask and the values we choose
                to preserve.
            </p>

            <p>
                Perhaps the most important skill of the future
                will be the ability to keep learning, adapting
                and thinking independently.
            </p>
        `

    },


    {
        id: 2,

        title: "Building Wealth Through Long-Term Thinking",

        subtitle: "Understanding ownership, capital and sustainable wealth.",

        category: "business",

        author: "Michael Knight",

        authorInitials: "MK",

        date: "October 25, 2026",

        timestamp: 1792886400000,

        readTime: 12,

        views: 9800,

        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",

        excerpt: "Understanding the principles behind sustainable wealth, ownership and financial freedom.",

        tags: [
            "Business",
            "Finance",
            "Wealth"
        ],

        content: `
            <p class="reader-lead">
                Wealth is rarely created through a single decision.
                It is usually the result of a series of thoughtful
                decisions made over a long period of time.
            </p>

            <h2>Understanding Long-Term Thinking</h2>

            <p>
                Short-term thinking often focuses on immediate
                rewards. Long-term thinking considers the
                consequences of decisions across years and decades.
            </p>

            <p>
                Successful businesses frequently build systems
                that create value continuously instead of
                depending on temporary opportunities.
            </p>

            <h2>The Importance of Ownership</h2>

            <p>
                Ownership can provide a different relationship
                with value creation. Instead of only exchanging
                time for money, ownership allows people to
                participate in the results of a system.
            </p>

            <blockquote>
                Think in decades, build with patience and
                understand the value of what you own.
            </blockquote>

            <h2>Building Sustainable Wealth</h2>

            <p>
                Sustainable financial progress requires
                discipline, knowledge, patience and the
                willingness to learn from mistakes.
            </p>
        `

    },


    {
        id: 3,

        title: "Understanding the Architecture of Human Thinking",

        subtitle: "Discover how our experiences shape our understanding of reality.",

        category: "psychology",

        author: "Sarah Lewis",

        authorInitials: "SL",

        date: "October 22, 2026",

        timestamp: 1792627200000,

        readTime: 10,

        views: 8700,

        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",

        excerpt: "Discover how thoughts, experiences and environments shape the way we see reality.",

        tags: [
            "Psychology",
            "Thinking",
            "Human Mind"
        ],

        content: `
            <p class="reader-lead">
                Our thoughts influence how we interpret the world.
                Yet the process behind thinking is often more
                complicated than we imagine.
            </p>

            <h2>How the Mind Processes Information</h2>

            <p>
                Every day, the human mind receives enormous
                amounts of information. Attention helps us
                select what deserves further consideration.
            </p>

            <p>
                Memories, expectations and previous experiences
                influence how we interpret new information.
            </p>

            <h2>Understanding Mental Models</h2>

            <p>
                Mental models are simplified representations
                that help us understand complex situations.
                They can improve decision-making when used
                thoughtfully.
            </p>

            <h2>Learning to Think Better</h2>

            <p>
                Better thinking begins with curiosity,
                questioning assumptions and remaining
                open to evidence that challenges our beliefs.
            </p>
        `

    },


    {
        id: 4,

        title: "The Questions That Define Human Existence",

        subtitle: "A journey through meaning, purpose and existence.",

        category: "philosophy",

        author: "Alexander Reed",

        authorInitials: "AR",

        date: "October 19, 2026",

        timestamp: 1792368000000,

        readTime: 15,

        views: 7200,

        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200",

        excerpt: "A journey through timeless philosophical questions about meaning, purpose and existence.",

        tags: [
            "Philosophy",
            "Existence",
            "Meaning"
        ],

        content: `
            <p class="reader-lead">
                Some questions do not have simple answers.
                Their value comes from the way they encourage
                us to examine our assumptions.
            </p>

            <h2>What Does It Mean to Exist?</h2>

            <p>
                Human beings have questioned their existence
                for thousands of years. Different philosophical
                traditions offer different approaches to
                understanding reality.
            </p>

            <h2>The Search for Meaning</h2>

            <p>
                Meaning can be connected to relationships,
                responsibilities, creativity, contribution
                and personal values.
            </p>

            <blockquote>
                The important thing is not simply to have
                answers, but to learn how to ask better questions.
            </blockquote>

            <h2>Living With Questions</h2>

            <p>
                Independent thinking requires the courage
                to examine ideas instead of accepting
                everything without reflection.
            </p>
        `

    },


    {
        id: 5,

        title: "The Quiet Power of Deep and Focused Work",

        subtitle: "Why meaningful work requires attention and patience.",

        category: "lifestyle",

        author: "Emma Clarke",

        authorInitials: "EC",

        date: "October 16, 2026",

        timestamp: 1792108800000,

        readTime: 7,

        views: 6900,

        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",

        excerpt: "Why meaningful work requires attention, patience and the courage to eliminate distractions.",

        tags: [
            "Productivity",
            "Focus",
            "Lifestyle"
        ],

        content: `
            <p class="reader-lead">
                In a world full of interruptions, sustained
                attention has become increasingly valuable.
            </p>

            <h2>Why Focus Matters</h2>

            <p>
                Focus allows us to work with greater depth.
                It helps us understand difficult problems
                and produce meaningful results.
            </p>

            <h2>Creating an Environment for Deep Work</h2>

            <p>
                A supportive environment reduces unnecessary
                interruptions. Clear goals and planned sessions
                can make focused work easier.
            </p>

            <h2>Consistency Over Intensity</h2>

            <p>
                Small periods of consistent effort can produce
                meaningful progress over time.
            </p>
        `

    },


    {
        id: 6,

        title: "How Computing Is Reshaping Our World",

        subtitle: "Explore the evolution of modern computing.",

        category: "technology",

        author: "Daniel Wilson",

        authorInitials: "DW",

        date: "October 12, 2026",

        timestamp: 1791763200000,

        readTime: 11,

        views: 6100,

        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",

        excerpt: "From personal computers to advanced systems, explore the evolution of modern computing.",

        tags: [
            "Computing",
            "Technology",
            "Innovation"
        ],

        content: `
            <p class="reader-lead">
                Computing has transformed communication,
                science, business and everyday life.
            </p>

            <h2>From Early Machines to Modern Systems</h2>

            <p>
                Early computing machines were designed to
                perform specific calculations. Modern
                computers are general-purpose systems
                capable of handling many different tasks.
            </p>

            <h2>The Role of Software</h2>

            <p>
                Software provides instructions that allow
                hardware to perform useful operations.
                Programming languages help humans express
                those instructions.
            </p>

            <h2>The Next Generation</h2>

            <p>
                New computing architectures and research
                continue to expand the possibilities
                of information processing.
            </p>
        `

    }

];


/* =========================================================
   06. UTILITY FUNCTIONS
========================================================= */

const Utils = {

    debounce(callback, delay = CONFIG.searchDelay) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);

        };

    },


    escapeHTML(value) {

        return String(value).replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            })[character]
        );

    },


    formatDate(date) {

        return new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(new Date(date));

    },


    scrollToTop() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    },


    lockScroll() {

        document.body.classList.add("no-scroll");

    },


    unlockScroll() {

        document.body.classList.remove("no-scroll");

    },


    getArticle(id) {

        return Articles.find(
            article => article.id === Number(id)
        );

    }

};


/* =========================================================
   07. TOAST NOTIFICATION SYSTEM
========================================================= */

const Toast = {

    show(message, type = "success") {

        if (!elements.toastMessage) {
            return;
        }

        elements.toastText.textContent = message;

        const icon = $("i", elements.toastMessage);

        if (icon) {

            icon.className =
                type === "error"
                    ? "fa-solid fa-circle-exclamation"
                    : "fa-solid fa-circle-check";

        }

        elements.toastMessage.classList.add("show");

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {

            elements.toastMessage.classList.remove("show");

        }, CONFIG.toastDuration);

    }

};


/* =========================================================
   08. PAGE LOADER
========================================================= */

const Loader = {

    init() {

        const hideLoader = () => {

            if (!elements.loader) {
                return;
            }

            elements.loader.classList.add("loader-hidden");

        };

        if (document.readyState === "complete") {

            hideLoader();

        } else {

            window.addEventListener(
                "load",
                hideLoader,
                { once: true }
            );

        }

        setTimeout(hideLoader, 2500);

    }

};


/* =========================================================
   09. THEME MANAGEMENT
========================================================= */

const Theme = {

    init() {

        this.apply(AppState.theme);

        elements.themeToggle?.addEventListener(
            "click",
            () => this.toggle()
        );

    },


    apply(theme) {

        AppState.theme = theme;

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        Storage.set("obsidian-theme", theme);

        const icon = elements.themeToggle?.querySelector("i");

        if (icon) {

            icon.className =
                theme === "dark"
                    ? "fa-regular fa-sun"
                    : "fa-regular fa-moon";

        }

    },


    toggle() {

        const nextTheme =
            AppState.theme === "dark"
                ? "light"
                : "dark";

        this.apply(nextTheme);

        Toast.show(
            `${nextTheme === "dark" ? "Dark" : "Light"} mode enabled`
        );

    }

};


/* =========================================================
   10. MOBILE NAVIGATION
========================================================= */

const Navigation = {

    init() {

        elements.mobileMenuButton?.addEventListener(
            "click",
            () => this.toggleMobile()
        );

        $$("#mobileNavigation a").forEach(link => {

            link.addEventListener("click", () => {
                this.closeMobile();
            });

        });

        window.addEventListener(
            "resize",
            Utils.debounce(() => {

                if (window.innerWidth > 900) {
                    this.closeMobile();
                }

            }, 150)
        );

    },


    toggleMobile() {

        elements.mobileNavigation?.classList.toggle("active");

        elements.mobileMenuButton?.classList.toggle("active");

    },


    closeMobile() {

        elements.mobileNavigation?.classList.remove("active");

        elements.mobileMenuButton?.classList.remove("active");

    }

};


/* =========================================================
   11. SEARCH OVERLAY
========================================================= */

const Search = {

    init() {

        elements.searchOpen?.addEventListener(
            "click",
            () => this.open()
        );

        elements.searchClose?.addEventListener(
            "click",
            () => this.close()
        );

        elements.searchInput?.addEventListener(
            "input",
            Utils.debounce(
                event => this.search(event.target.value),
                CONFIG.searchDelay
            )
        );

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                this.close();
            }

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                this.open();

            }

        });

    },


    open() {

        elements.searchOverlay?.classList.add("active");

        Utils.lockScroll();

        setTimeout(() => {
            elements.searchInput?.focus();
        }, 100);

    },


    close() {

        elements.searchOverlay?.classList.remove("active");

        Utils.unlockScroll();

    },


    search(query) {

        const normalizedQuery = query.trim().toLowerCase();

        AppState.searchQuery = normalizedQuery;

        if (!elements.searchResults) {
            return;
        }

        if (!normalizedQuery) {

            elements.searchResults.innerHTML = "";

            return;

        }

        const results = Articles.filter(article => {

            const searchableText = [
                article.title,
                article.subtitle,
                article.category,
                article.author,
                article.excerpt,
                ...article.tags
            ].join(" ").toLowerCase();

            return searchableText.includes(normalizedQuery);

        });

        this.renderResults(results);

    },


    renderResults(results) {

        if (!results.length) {

            elements.searchResults.innerHTML = `
                <div class="search-empty">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h3>No articles found</h3>
                    <p>Try another keyword.</p>
                </div>
            `;

            return;

        }

        elements.searchResults.innerHTML = results.map(article => `

            <button
                class="search-result-item"
                data-article-id="${article.id}"
            >

                <img
                    src="${Utils.escapeHTML(article.image)}"
                    alt=""
                >

                <span class="search-result-information">

                    <small>
                        ${Utils.escapeHTML(article.category)}
                        · ${article.readTime} MIN READ
                    </small>

                    <strong>
                        ${Utils.escapeHTML(article.title)}
                    </strong>

                    <span>
                        ${Utils.escapeHTML(article.author)}
                    </span>

                </span>

                <i class="fa-solid fa-arrow-up-right-from-square"></i>

            </button>

        `).join("");

        $$(".search-result-item", elements.searchResults).forEach(button => {

            button.addEventListener("click", () => {

                const article = Utils.getArticle(
                    button.dataset.articleId
                );

                if (article) {

                    this.close();

                    Reader.open(article);

                }

            });

        });

    }

};


/* =========================================================
   12. ARTICLE CARD RENDERING
========================================================= */

const ArticleRenderer = {

    getFilteredArticles() {

        let filtered = [...Articles];

        if (AppState.activeCategory !== "all") {

            filtered = filtered.filter(article => {

                return article.category === AppState.activeCategory;

            });

        }

        const query = AppState.searchQuery;

        if (query) {

            filtered = filtered.filter(article => {

                const searchable = [
                    article.title,
                    article.author,
                    article.category,
                    article.excerpt
                ].join(" ").toLowerCase();

                return searchable.includes(query);

            });

        }

        const sortMode = elements.articleSort?.value || "latest";

        if (sortMode === "popular") {

            filtered.sort((a, b) => b.views - a.views);

        } else if (sortMode === "oldest") {

            filtered.sort((a, b) => a.timestamp - b.timestamp);

        } else {

            filtered.sort((a, b) => b.timestamp - a.timestamp);

        }

        return filtered;

    },


    render() {

        if (!elements.articleGrid) {
            return;
        }

        const articles = this.getFilteredArticles();

        const visibleArticles = articles.slice(
            0,
            AppState.currentPage * CONFIG.articlesPerPage
        );

        if (!visibleArticles.length) {

            elements.articleGrid.innerHTML = `
                <div class="article-empty">
                    <i class="fa-regular fa-folder-open"></i>
                    <h3>No articles available</h3>
                    <p>Try selecting another category.</p>
                </div>
            `;

            this.updateLoadMore(0, 0);

            return;

        }

        elements.articleGrid.innerHTML = visibleArticles.map(
            article => this.createCard(article)
        ).join("");

        this.bindCardEvents();

        this.updateLoadMore(
            visibleArticles.length,
            articles.length
        );

    },


    createCard(article) {

        const isBookmarked = AppState.bookmarks.includes(article.id);

        return `

            <article
                class="article-card"
                data-category="${Utils.escapeHTML(article.category)}"
                data-article-id="${article.id}"
            >

                <div class="article-image-container">

                    <img
                        src="${Utils.escapeHTML(article.image)}"
                        alt="${Utils.escapeHTML(article.title)}"
                        loading="lazy"
                    >

                    <span class="article-category">
                        ${Utils.escapeHTML(article.category)}
                    </span>

                    <button
                        class="bookmark-button ${isBookmarked ? "bookmarked" : ""}"
                        data-bookmark-id="${article.id}"
                        aria-label="Bookmark article"
                    >

                        <i class="${isBookmarked ? "fa-solid" : "fa-regular"} fa-bookmark"></i>

                    </button>

                </div>


                <div class="article-content">

                    <div class="article-meta">

                        <span>
                            ${Utils.escapeHTML(article.date)}
                        </span>

                        <span class="meta-dot"></span>

                        <span>
                            ${article.readTime} MIN READ
                        </span>

                    </div>


                    <h3>

                        <button
                            class="article-title-button"
                            data-open-article="${article.id}"
                        >
                            ${Utils.escapeHTML(article.title)}
                        </button>

                    </h3>


                    <p>
                        ${Utils.escapeHTML(article.excerpt)}
                    </p>


                    <div class="article-author">

                        <div class="author-avatar">
                            ${Utils.escapeHTML(article.authorInitials)}
                        </div>

                        <div class="author-information">

                            <strong>
                                ${Utils.escapeHTML(article.author)}
                            </strong>

                            <span>
                                ${Utils.escapeHTML(article.category)}
                            </span>

                        </div>

                        <span class="article-number">
                            ${String(article.id).padStart(2, "0")}
                        </span>

                    </div>

                </div>

            </article>

        `;

    },


    bindCardEvents() {

        $$("[data-open-article]").forEach(button => {

            button.addEventListener("click", () => {

                const article = Utils.getArticle(
                    button.dataset.openArticle
                );

                if (article) {
                    Reader.open(article);
                }

            });

        });

        $$("[data-bookmark-id]").forEach(button => {

            button.addEventListener("click", event => {

                event.stopPropagation();

                Bookmark.toggle(
                    Number(button.dataset.bookmarkId)
                );

            });

        });

    },


    updateLoadMore(visible, total) {

        if (!elements.loadMoreButton) {
            return;
        }

        elements.loadMoreButton.style.display =
            visible < total ? "inline-flex" : "none";

    }

};


/* =========================================================
   13. CATEGORY FILTERING
========================================================= */

const CategoryFilter = {

    init() {

        if (!elements.categoryFilters) {
            return;
        }

        $$(".filter-button", elements.categoryFilters).forEach(button => {

            button.addEventListener("click", () => {

                $$(".filter-button", elements.categoryFilters).forEach(item => {

                    item.classList.remove("active");

                });

                button.classList.add("active");

                AppState.activeCategory = button.dataset.category;

                AppState.currentPage = 1;

                ArticleRenderer.render();

            });

        });

    }

};


/* =========================================================
   14. ARTICLE SORTING
========================================================= */

const Sorting = {

    init() {

        elements.articleSort?.addEventListener("change", () => {

            AppState.currentPage = 1;

            ArticleRenderer.render();

        });

    }

};


/* =========================================================
   15. LOAD MORE ARTICLES
========================================================= */

const LoadMore = {

    init() {

        elements.loadMoreButton?.addEventListener(
            "click",
            () => {

                AppState.currentPage++;

                ArticleRenderer.render();

            }
        );

    }

};


/* =========================================================
   16. BOOKMARK MANAGER
========================================================= */

const Bookmark = {

    toggle(articleId) {

        const index = AppState.bookmarks.indexOf(articleId);

        if (index === -1) {

            AppState.bookmarks.push(articleId);

            Toast.show("Article added to bookmarks");

        } else {

            AppState.bookmarks.splice(index, 1);

            Toast.show("Bookmark removed");

        }

        Storage.set(
            "obsidian-bookmarks",
            AppState.bookmarks
        );

        ArticleRenderer.render();

        this.updateReaderButton(articleId);

    },


    isBookmarked(articleId) {

        return AppState.bookmarks.includes(articleId);

    },


    updateReaderButton(articleId) {

        if (!elements.readerBookmark) {
            return;
        }

        const bookmarked = this.isBookmarked(articleId);

        const icon = $("i", elements.readerBookmark);

        if (icon) {

            icon.className = bookmarked
                ? "fa-solid fa-bookmark"
                : "fa-regular fa-bookmark";

        }

        elements.readerBookmark.classList.toggle(
            "bookmarked",
            bookmarked
        );

    },


    getSavedArticles() {

        return AppState.bookmarks
            .map(id => Utils.getArticle(id))
            .filter(Boolean);

    }

};


/* =========================================================
   17. ARTICLE READER
========================================================= */

const Reader = {

    init() {

        elements.readerBack?.addEventListener(
            "click",
            () => this.close()
        );

        elements.readerBookmark?.addEventListener(
            "click",
            () => {

                if (AppState.currentArticle) {

                    Bookmark.toggle(
                        AppState.currentArticle.id
                    );

                }

            }
        );

        elements.readerShare?.addEventListener(
            "click",
            () => this.share()
        );

        window.addEventListener(
            "scroll",
            () => this.updateProgress(),
            { passive: true }
        );

    },


    open(article) {

        if (!article || !elements.reader) {
            return;
        }

        AppState.currentArticle = article;

        elements.readerTitle.textContent = article.title;

        elements.readerSubtitle.textContent = article.subtitle;

        elements.readerCategory.textContent = article.category.toUpperCase();

        elements.readerAuthor.textContent = article.author;

        elements.readerDate.textContent =
            `${article.date} · ${article.readTime} min read`;

        elements.readerCover.src = article.image;

        elements.readerCover.alt = article.title;

        elements.readerBody.innerHTML = article.content;

        elements.reader.classList.add("active");

        document.body.classList.add("reader-open");

        Utils.lockScroll();

        Bookmark.updateReaderButton(article.id);

        this.generateTOC();

        this.applySettings();

        this.recordHistory(article.id);

        this.updateProgress();

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    },


    close() {

        elements.reader?.classList.remove("active");

        document.body.classList.remove("reader-open");

        Utils.unlockScroll();

        AppState.currentArticle = null;

    },


    generateTOC() {

        const toc = $("#articleTOC");

        if (!toc || !elements.readerBody) {
            return;
        }

        const headings = $$(
            "h2",
            elements.readerBody
        );

        toc.innerHTML = headings.map((heading, index) => {

            if (!heading.id) {

                heading.id = `reader-heading-${index}`;

            }

            return `

                <a href="#${heading.id}" data-toc-id="${heading.id}">
                    ${Utils.escapeHTML(heading.textContent)}
                </a>

            `;

        }).join("");

        $$("[data-toc-id]", toc).forEach(link => {

            link.addEventListener("click", event => {

                event.preventDefault();

                const target = document.getElementById(
                    link.dataset.tocId
                );

                target?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

    },


    updateProgress() {

        if (
            !elements.reader?.classList.contains("active") ||
            !elements.readerBody
        ) {
            return;
        }

        const article = elements.readerBody;

        const readerTop = article.getBoundingClientRect().top;

        const readerHeight = article.scrollHeight;

        const availableHeight =
            readerHeight - window.innerHeight;

        let progress = 0;

        if (availableHeight > 0) {

            progress = Math.max(
                0,
                Math.min(
                    100,
                    (-readerTop / availableHeight) * 100
                )
            );

        }

        if (elements.readerProgress) {

            elements.readerProgress.style.width =
                `${progress}%`;

        }

        if (elements.readingPercentage) {

            elements.readingPercentage.textContent =
                `${Math.round(progress)}%`;

        }

        if (elements.miniProgressFill) {

            elements.miniProgressFill.style.width =
                `${progress}%`;

        }

    },


    recordHistory(articleId) {

        const existing = AppState.readingHistory.filter(
            item => item.id !== articleId
        );

        existing.unshift({
            id: articleId,
            date: new Date().toISOString()
        });

        AppState.readingHistory = existing.slice(0, 50);

        Storage.set(
            "obsidian-history",
            AppState.readingHistory
        );

    },


    async share() {

        const article = AppState.currentArticle;

        if (!article) {
            return;
        }

        const shareData = {
            title: article.title,
            text: article.excerpt,
            url: window.location.href
        };

        try {

            if (navigator.share) {

                await navigator.share(shareData);

            } else {

                await navigator.clipboard.writeText(
                    `${article.title}\n${window.location.href}`
                );

                Toast.show("Article link copied");

            }

        } catch (error) {

            if (error.name !== "AbortError") {

                Toast.show(
                    "Unable to share this article",
                    "error"
                );

            }

        }

    },


    applySettings() {

        if (!elements.readerBody) {
            return;
        }

        elements.readerBody.style.fontSize =
            `${AppState.fontSize}px`;

        elements.readerBody.style.lineHeight =
            AppState.lineHeight;

        if (elements.fontSizeControl) {

            elements.fontSizeControl.value =
                AppState.fontSize;

        }

        if (elements.lineHeightControl) {

            elements.lineHeightControl.value =
                AppState.lineHeight;

        }

    }

};


/* =========================================================
   18. READING SETTINGS
========================================================= */

const ReadingSettings = {

    init() {

        elements.fontSizeControl?.addEventListener(
            "input",
            event => {

                AppState.fontSize = Number(event.target.value);

                Storage.set(
                    "obsidian-font-size",
                    AppState.fontSize
                );

                Reader.applySettings();

            }
        );


        elements.lineHeightControl?.addEventListener(
            "input",
            event => {

                AppState.lineHeight = Number(event.target.value);

                Storage.set(
                    "obsidian-line-height",
                    AppState.lineHeight
                );

                Reader.applySettings();

            }
        );


        elements.readerResetSettings?.addEventListener(
            "click",
            () => this.reset()
        );

    },


    reset() {

        AppState.fontSize = CONFIG.defaultFontSize;

        AppState.lineHeight = CONFIG.defaultLineHeight;

        Storage.set(
            "obsidian-font-size",
            AppState.fontSize
        );

        Storage.set(
            "obsidian-line-height",
            AppState.lineHeight
        );

        Reader.applySettings();

        Toast.show("Reading settings reset");

    }

};


/* =========================================================
   19. MODAL MANAGER
========================================================= */

const Modal = {

    init() {

        $(".login-link")?.addEventListener(
            "click",
            event => {

                event.preventDefault();

                this.open("login");

            }
        );


        $$("[data-modal-close], .modal-close").forEach(button => {

            button.addEventListener(
                "click",
                () => this.closeAll()
            );

        });


        elements.loginModal?.addEventListener("click", event => {

            if (event.target === elements.loginModal) {
                this.closeAll();
            }

        });


        elements.registerModal?.addEventListener("click", event => {

            if (event.target === elements.registerModal) {
                this.closeAll();
            }

        });


        $("#switchToRegister")?.addEventListener(
            "click",
            () => {

                this.closeAll();

                this.open("register");

            }
        );


        $("#switchToLogin")?.addEventListener(
            "click",
            () => {

                this.closeAll();

                this.open("login");

            }
        );


        $("#loginForm")?.addEventListener(
            "submit",
            event => this.handleLogin(event)
        );


        $("#registerForm")?.addEventListener(
            "submit",
            event => this.handleRegister(event)
        );

    },


    open(type) {

        const modal =
            type === "register"
                ? elements.registerModal
                : elements.loginModal;

        modal?.classList.add("active");

        Utils.lockScroll();

    },


    closeAll() {

        elements.loginModal?.classList.remove("active");

        elements.registerModal?.classList.remove("active");

        Utils.unlockScroll();

    },


    handleLogin(event) {

        event.preventDefault();

        const email = $("#loginEmail").value.trim();

        const password = $("#loginPassword").value;

        if (!email || !password) {

            Toast.show("Please fill in all fields", "error");

            return;

        }

        Toast.show(
            "Demo login only — connect a backend to authenticate."
        );

    },


    handleRegister(event) {

        event.preventDefault();

        const name = $("#registerName").value.trim();

        const email = $("#registerEmail").value.trim();

        const password = $("#registerPassword").value;

        if (!name || !email || password.length < 8) {

            Toast.show("Please check your information", "error");

            return;

        }

        Toast.show(
            "Demo registration only — connect a backend to create accounts."
        );

    }

};


/* =========================================================
   20. NEWSLETTER
========================================================= */

const Newsletter = {

    init() {

        elements.newsletterForm?.addEventListener(
            "submit",
            event => this.submit(event)
        );

    },


    submit(event) {

        event.preventDefault();

        const emailInput = $("#newsletterEmail");

        const email = emailInput.value.trim();

        if (!email) {

            this.showMessage("Please enter your email address.", "error");

            return;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            this.showMessage("Please enter a valid email address.", "error");

            return;

        }

        const subscribers = Storage.get(
            "obsidian-subscribers",
            []
        );

        if (subscribers.includes(email)) {

            this.showMessage("You are already subscribed.", "error");

            return;

        }

        subscribers.push(email);

        Storage.set(
            "obsidian-subscribers",
            subscribers
        );

        this.showMessage(
            "Thank you! Your demo subscription has been saved locally.",
            "success"
        );

        elements.newsletterForm.reset();

    },


    showMessage(message, type) {

        if (!elements.newsletterMessage) {
            return;
        }

        elements.newsletterMessage.textContent = message;

        elements.newsletterMessage.className =
            `newsletter-message ${type}`;

    }

};


/* =========================================================
   21. ANNOUNCEMENT BAR
========================================================= */

const Announcement = {

    init() {

        const closeButton = $(".announcement-close");

        const bar = $(".announcement-bar");

        closeButton?.addEventListener("click", () => {

            bar?.classList.add("announcement-hidden");

        });

    }

};


/* =========================================================
   22. HEADER SCROLL EFFECT
========================================================= */

const Header = {

    init() {

        window.addEventListener(
            "scroll",
            Utils.debounce(() => this.update(), 20),
            { passive: true }
        );

        this.update();

    },


    update() {

        if (!elements.header) {
            return;
        }

        elements.header.classList.toggle(
            "header-scrolled",
            window.scrollY > 50
        );

        elements.backToTop?.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    }

};


/* =========================================================
   23. BACK TO TOP
========================================================= */

const BackToTop = {

    init() {

        elements.backToTop?.addEventListener(
            "click",
            Utils.scrollToTop
        );

        $$(".back-to-top").forEach(button => {

            button.addEventListener("click", event => {

                event.preventDefault();

                Utils.scrollToTop();

            });

        });

    }

};


/* =========================================================
   24. HERO AND GENERAL INTERACTIONS
========================================================= */

const GeneralInteractions = {

    init() {

        $$('a[href^="#"]').forEach(link => {

            link.addEventListener("click", event => {

                const targetId = link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId === "#reader"
                ) {
                    return;
                }

                const target = document.querySelector(targetId);

                if (!target) {
                    return;
                }

                if (target.classList.contains("modal-overlay")) {

                    event.preventDefault();

                    return;

                }

                if (
                    target.classList.contains("reader-overlay") &&
                    !target.classList.contains("active")
                ) {

                    return;

                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

    }

};


/* =========================================================
   25. INTERSECTION OBSERVER
========================================================= */

const RevealAnimations = {

    init() {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        currentObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        const animatedElements = $$(
            ".article-card, .category-card, .author-card, .featured-content"
        );

        animatedElements.forEach(element => {

            element.classList.add("reveal-on-scroll");

            observer.observe(element);

        });

    }

};


/* =========================================================
   26. KEYBOARD SHORTCUTS
========================================================= */

const KeyboardShortcuts = {

    init() {

        document.addEventListener("keydown", event => {

            const activeTag = document.activeElement?.tagName;

            const isTyping =
                activeTag === "INPUT" ||
                activeTag === "TEXTAREA" ||
                activeTag === "SELECT";

            if (isTyping) {
                return;
            }

            if (event.key === "Escape") {

                Reader.close();

                Modal.closeAll();

                Navigation.closeMobile();

            }

            if (event.key === "ArrowLeft") {

                if (elements.reader?.classList.contains("active")) {

                    Utils.scrollToTop();

                }

            }

        });

    }

};


/* =========================================================
   27. BOOKMARK BUTTONS IN STATIC HTML
========================================================= */

const StaticBookmarks = {

    init() {

        $$(".bookmark-button").forEach(button => {

            if (button.dataset.bookmarkId) {
                return;
            }

            const card = button.closest(".article-card");

            if (!card) {
                return;
            }

            const index = $$(".article-card").indexOf(card);

            const article = Articles[index];

            if (!article) {
                return;
            }

            button.addEventListener("click", event => {

                event.preventDefault();

                Bookmark.toggle(article.id);

            });

        });

    }

};


/* =========================================================
   28. MEMBERSHIP BUTTONS
========================================================= */

const Membership = {

    init() {

        $$(".membership-button, .header-cta").forEach(button => {

            button.addEventListener("click", event => {

                const target = document.querySelector(
                    button.getAttribute("href")
                );

                if (!target) {

                    event.preventDefault();

                    Toast.show(
                        "Membership plans will be available soon."
                    );

                }

            });

        });

    }

};


/* =========================================================
   29. APPLICATION INITIALIZATION
========================================================= */

const App = {

    init() {

        console.log(
            `%c${CONFIG.siteName} v${CONFIG.version}`,
            "font-size:18px;font-weight:bold;color:#c6a76a;"
        );

        Loader.init();

        Theme.init();

        Navigation.init();

        Search.init();

        CategoryFilter.init();

        Sorting.init();

        LoadMore.init();

        Reader.init();

        ReadingSettings.init();

        Modal.init();

        Newsletter.init();

        Announcement.init();

        Header.init();

        BackToTop.init();

        GeneralInteractions.init();

        KeyboardShortcuts.init();

        Membership.init();

        ArticleRenderer.render();

        StaticBookmarks.init();

        RevealAnimations.init();

        console.log("Obsidian Pro initialized successfully.");

    }

};


/* =========================================================
   30. START APPLICATION
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        () => App.init(),
        { once: true }
    );

} else {

    App.init();

}


/* =========================================================
   END OF OBSIDIAN PRO JAVASCRIPT
========================================================= */
