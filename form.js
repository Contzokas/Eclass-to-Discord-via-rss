window.addEventListener('DOMContentLoaded', function() {
    const universitySelect = document.getElementById('university');
    const detailsDiv = document.getElementById('details-fields');
    const coursesList = document.getElementById('courses-list');
    const addCourseBtn = document.getElementById('add-course');

    function toggleDetails() {
        if (universitySelect.value === "") {
            detailsDiv.style.display = "none";
        } else {
            detailsDiv.style.display = "block";
        }
    }

    universitySelect.addEventListener('change', toggleDetails);
    toggleDetails();

    let courseCount = 1;
    addCourseBtn.addEventListener('click', function() {
        courseCount++;
        const div = document.createElement('div');
        div.className = 'course-entry';
        div.innerHTML = `
            <label for="rss-${courseCount}">eClass RSS Feed URL</label>
            <input type="url" id="rss-${courseCount}" name="rss[]" placeholder="https://eclass.gr/modules/announcements/rss.php?..." required>
            <label for="course-${courseCount}">Course Name</label>
            <input type="text" id="course-${courseCount}" name="course[]" placeholder="Course Name" required>
            <button type="button" class="remove-course" style="margin-bottom:1rem;">Αφαίρεση</button>
        `;
        coursesList.appendChild(div);

        div.querySelector('.remove-course').onclick = function() {
            div.remove();
        };
    });
});