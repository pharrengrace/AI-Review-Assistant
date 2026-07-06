// -----------------------------
// STAR RATING
// -----------------------------

let rating = 0;

const stars = document.querySelectorAll("#starRating span");

stars.forEach((star, index) => {
    star.addEventListener("click", () => {

        rating = index + 1;

        stars.forEach((s, i) => {
            if (i < rating) {
                s.classList.add("active");
                s.textContent = "★";
            } else {
                s.classList.remove("active");
                s.textContent = "☆";
            }
        });

    });
});


// -----------------------------
// GENERATE REVIEW + AI REQUEST
// -----------------------------

document.getElementById("generateBtn").addEventListener("click", async () => {

    const generateBtn = document.getElementById("generateBtn");
    const reviewContainer = document.getElementById("reviewContainer");
    const reviewBox = document.getElementById("generatedReview");

    // Loading state
    generateBtn.disabled = true;
    generateBtn.innerHTML = "⏳ Improving your review...";

    reviewContainer.style.display = "block";
    reviewBox.value = "✨ Improving your review...\n\nThis usually takes just a few seconds.";

    const service = document.getElementById("service").value;
    const comments = document.getElementById("comments").value;

    const checked = [];

    document.querySelectorAll(".checkbox-group input:checked")
        .forEach(box => checked.push(box.value));

    let review = `I had a great experience at Simmons Family Dentistry during my ${service.toLowerCase()}. `;

    if (checked.length > 0) {
        review += "The " + checked.join(", ").toLowerCase() + " really stood out. ";
    }

    if (comments.trim() !== "") {
        review += comments.trim() + " ";
    }

    review += "I would definitely recommend Simmons Family Dentistry to anyone looking for quality dental care!";

    try {

        const res = await fetch("/api/google-reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: review
            })
        });

        const data = await res.json();

        console.log("AI response:", data);

        if (data.improved) {
            reviewBox.value = data.improved;
        } else {
            reviewBox.value = review;
        }

    } catch (err) {

        console.error("API error:", err);

        reviewBox.value = review;

    }

    // Show with fade animation
    reviewContainer.classList.add("fade-in");

    // Restore button
    generateBtn.disabled = false;
    generateBtn.innerHTML = "✨ Generate My Review";

});


// -----------------------------
// COPY REVIEW
// -----------------------------

document.getElementById("copyBtn").addEventListener("click", () => {

    const review = document.getElementById("generatedReview");

    navigator.clipboard.writeText(review.value);

    alert("✅ Review copied! Now click 'Post My Review on Google' and paste it.");

});


// -----------------------------
// GOOGLE REVIEW BUTTON
// -----------------------------

document.getElementById("googleReviewBtn").addEventListener("click", () => {

    window.location.href =
        "https://search.google.com/local/writereview?placeid=ChIJDU7R8RMM3IARnMfbJzw6uZo";

});