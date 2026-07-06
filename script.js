// -----------------------------
// STAR RATING
// -----------------------------

let rating = 0;

const stars = document.querySelectorAll("#starRating span");

stars.forEach((star, index) => {
    star.addEventListener("click", () => {
        rating = index + 1;

        stars.forEach((s, i) => {
            s.textContent = i < rating ? "★" : "☆";
        });
    });
});


// -----------------------------
// GENERATE REVIEW + AI REQUEST
// -----------------------------

document.getElementById("generateBtn").addEventListener("click", async () => {

    const service = document.getElementById("service").value;
    const comments = document.getElementById("comments").value;

    const checked = [];

    document.querySelectorAll(".checkbox-group input:checked")
        .forEach(box => checked.push(box.value));

    // Build base review
    let review = `I had a great experience at Simmons Family Dentistry during my ${service.toLowerCase()}. `;

    if (checked.length > 0) {
        review += "The " + checked.join(", ").toLowerCase() + " really stood out. ";
    }

    if (comments.trim() !== "") {
        review += comments.trim() + " ";
    }

    review += "I would definitely recommend Simmons Family Dentistry to anyone looking for quality dental care!";

    // Show review immediately
    const reviewBox = document.getElementById("generatedReview");
    reviewBox.value = review;

    document.getElementById("reviewContainer").style.display = "block";

    // Send to AI backend
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
        }

    } catch (err) {
        console.error("API error:", err);
    }
});


// -----------------------------
// COPY REVIEW
// -----------------------------

document.getElementById("copyBtn").addEventListener("click", () => {

    const review = document.getElementById("generatedReview");

    review.select();
    review.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(review.value);

    alert("Review copied! You can now paste it into Google Reviews.");
});


// -----------------------------
// GOOGLE REVIEW BUTTON
// -----------------------------

document.getElementById("googleReviewBtn").addEventListener("click", () => {
    window.location.href =
        "https://search.google.com/local/writereview?placeid=ChIJDU7R8RMM3IARnMfbJzw6uZo";
});