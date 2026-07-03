// ============================================
//  SHIBA MAKEUP - main.js (Static Version)
//  No Node.js / No Backend — Pure HTML+CSS+JS
// ============================================

/* ---------- CONFIG ---------- */
// ⚠️ APNA WHATSAPP NUMBER YAHAN DAALO:
const WHATSAPP_NUMBER = "919927693604"; // 91 + 10 digit number (no spaces, no +)
// const OWNER_EMAIL = "Royalhennabyshadaf712@gmail.com";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzp2FJEeF9rIpyMVGxyn5QEGbJANkZ08oCLpDZMyyBCiHalZLn4j770tJwYA-MLEr12mw/exec";

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    document.getElementById("scrollTop").classList.toggle("show", window.scrollY > 400);
});

/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("open");
    });
});

/* ---------- SERVICE TABS ---------- */
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".service-panel").forEach(p => p.classList.remove("active"));

        btn.classList.add("active");
        const panel = document.getElementById("tab-" + btn.dataset.tab);
        if (panel) {
            panel.classList.add("active");
            panel.style.animation = "fadeIn .4s ease";
        }
    });
});

/* ---------- GALLERY LIGHTBOX ---------- */
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCaption");

function openLightbox(el) {
    const img = el.querySelector("img");
    const cap = el.querySelector(".gallery-overlay span");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = cap ? cap.textContent : "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
});

document.querySelector(".lightbox-inner").addEventListener("click", e => {
    e.stopPropagation();
});

/* ---------- WHATSAPP ---------- */
function openWhatsApp() {
    const msg = encodeURIComponent(
        "Hi! I came across your Shiba Makeup website and I'd like to book an appointment. 💄"
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

/* ---------- APPOINTMENT FORM (Formspree via fetch) ---------- */
const apptForm = document.getElementById("apptForm");
const formSuccess = document.getElementById("formSuccess");  


//  YE MENE CLAUDE SE ADD KARWAYA HAI 


function validateForm() {
    let isValid = true;

    const emailInput = document.getElementById("femail");
    const phoneInput = document.getElementById("fphone");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");

    emailInput.classList.remove("input-error");
    phoneInput.classList.remove("input-error");
    emailError.style.display = "none";
    phoneError.style.display = "none";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email (e.g. name@gmail.com)";
        emailError.style.display = "block";
        emailInput.classList.add("input-error");
        isValid = false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneError.textContent = "Please enter a valid 10-digit phone number";
        phoneError.style.display = "block";
        phoneInput.classList.add("input-error");
        isValid = false;
    }

    return isValid;
}







apptForm.addEventListener("submit", async (e) => {
    e.preventDefault(); 
       if (!validateForm()) {
        return;
    }

    // reCAPTCHA check
    const recaptchaResponse = typeof grecaptcha !== "undefined" ? grecaptcha.getResponse() : "";
    if (!recaptchaResponse) {
        alert("Please verify you are not a robot! ✅");
        return;
    }

    const submitBtn = apptForm.querySelector(".form-submit");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const checkedServices = [
        ...apptForm.querySelectorAll('input[name="services"]:checked')
    ].map(cb => cb.value).join(", ") || "Not specified";

    const data = {
        name: document.getElementById("fname").value,
        email: document.getElementById("femail").value,
        phone: document.getElementById("fphone").value,
        city: document.getElementById("fcity").value,
        services: checkedServices,
        date: document.getElementById("fdate").value,
        time: document.getElementById("ftime").value,
        message: document.getElementById("fmsg").value,
    };

    // if (FORMSPREE_ID && FORMSPREE_ID !== "YOUR_FORM_ID") {
    //     try {
    //         const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 ...data,
    //                 "g-recaptcha-response": recaptchaResponse,
    //                 _subject: `New Appointment: ${data.name} — ${checkedServices}`,
    //             }),
    //         });
    //         if (res.ok) {
    //             showSuccess(data);
    //         } else {
    //             throw new Error("Failed");
    //         }
    //     } catch {
    //         fallbackMailto(data);
    //     }
    // } else {
    //     fallbackMailto(data);
    // } 




    // submit data use hoga yaha chatgpt ka code use hua hai yaha aur  


//     try {
//     const res = await fetch(GOOGLE_SCRIPT_URL, {
//         method: "POST", 


//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             ...data,
//             recaptcha: recaptchaResponse
//         })
//     });

//     const result = await res.json();

//     if (result.result === "success") {
//         showSuccess(data);
//     } else {
//         throw new Error("Failed");
//     }

// } catch (err) {
//     alert("Form submit nahi hua. Dobara try karo.");
//     console.error(err);
// } 



// yaha tak chatgpt ka code hai  




try {

   const res = await fetch("https://script.google.com/macros/s/AKfycbzp2FJEeF9rIpyMVGxyn5QEGbJANkZ08oCLpDZMyyBCiHalZLn4j770tJwYA-MLEr12mw/exec", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        services: data.services,
        date: data.date,
        time: data.time,
        message: data.message
    })
});
 

   
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Appointment Request';
    showSuccess(data);

} catch (err) {
    console.error("ERROR => ", err);
    alert(err.message);
} 




    if (typeof grecaptcha !== "undefined") grecaptcha.reset();
});

function showSuccess(data) {
    formSuccess.classList.add("show");
    apptForm.reset();

    const waMsg = encodeURIComponent(
        `Hi! Maine aapki website par appointment form fill kiya hai.\n\n` +
        `Naam: ${data.name}\nServices: ${data.services}\nDate: ${data.date || "Flexible"}\n\nPlease confirm karein. 💄`
    );
    const waLink = document.createElement("a");
    waLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
    waLink.target = "_blank";
    waLink.style.cssText = `
    display:block; text-align:center; margin-top:10px;
    color:#25d366; font-size:.85rem; font-weight:600;
  `;
    waLink.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp pe bhi confirm karein';
    formSuccess.after(waLink);

    setTimeout(() => {
        formSuccess.classList.remove("show");
        waLink.remove();
    }, 8000);
}

function fallbackMailto(data) {
    const body =
        `New Appointment Request%0A%0A` +
        `Name: ${data.name}%0A` +
        `Email: ${data.email}%0A` +
        `Phone: ${data.phone}%0A` +
        `City: ${data.city}%0A` +
        `Services: ${data.services}%0A` +
        `Date: ${data.date}%0A` +
        `Time: ${data.time}%0A` +
        `Message: ${data.message}`;

    window.location.href =
        `mailto:${OWNER_EMAIL}?subject=New Appointment - ${data.name}&body=${body}`;
    showSuccess(data);
}

/* ---------- SCROLL ANIMATIONS (AOS) ---------- */
const aosEls = document.querySelectorAll("[data-aos]");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("aos-animate");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
aosEls.forEach(el => observer.observe(el));

/* ---------- NUMBER COUNTER ANIMATION ---------- */
function animateCounter(el, target, suffix = "") {
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
    }, 30);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll(".stat-num");
            nums.forEach(n => {
                const t = n.textContent;
                if (t.includes("100")) animateCounter(n, 100, "+");
                if (t.includes("3+")) animateCounter(n, 3, "+");
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector(".hero-stats");
if (heroStats) statsObserver.observe(heroStats);

/* ---------- SERVICE CARD HOVER EFFECT ---------- */
document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        const icon = card.querySelector(".sc-icon");
        if (icon) icon.style.transform = "scale(1.1) rotate(5deg)";
    });
    card.addEventListener("mouseleave", () => {
        const icon = card.querySelector(".sc-icon");
        if (icon) icon.style.transform = "";
    });
});

/* ---------- ACTIVE NAV LINK HIGHLIGHT ---------- */
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    document.querySelectorAll(".nav-links a").forEach(a => {
        a.style.color = a.getAttribute("href") === `#${current}` ? "var(--rose)" : "";
    });
});

console.log("%c💄 Shiba Makeup Loaded — Static Version!", "color:#e91e8c;font-size:16px;font-weight:bold;");