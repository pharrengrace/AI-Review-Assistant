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
// GENERATE REVIEW
// -----------------------------

document.getElementById("generateBtn").addEventListener("click", () => {

    const service = document.getElementById("service").value;

    const comments = document.getElementById("comments").value;

    const checked = [];

    document.querySelectorAll(".checkbox-group input:checked")
        .forEach(box => checked.push(box.value));

    // Build a review
    let review = `I had a great experience at Simmons Family Dentistry during my ${service.toLowerCase()}. `;

    if (checked.length > 0) {
        review += "The " + checked.join(", ").toLowerCase() + " really stood out. ";
    }

    if (comments.trim() !== "") {
        review += comments.trim() + " ";
    }

    review += "I would definitely recommend Simmons Family Dentistry to anyone looking for quality dental care!";

    // Show the review
    document.getElementById("generatedReview").value = review;

    document.getElementById("reviewContainer").style.display = "block";

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