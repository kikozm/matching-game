// script.js

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const feedback = document.getElementById('feedback');
    const successSound = document.getElementById('success-sound');
    const errorSound = document.getElementById('error-sound');

    let draggedItem = null;

    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.classList.add('dragging');
            }, 0);
        });

        item.addEventListener('dragend', () => {
            draggedItem = null;
            item.classList.remove('dragging');
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('over');
        });

        zone.addEventListener('drop', () => {
            zone.classList.remove('over');
            if (draggedItem) {
                const letter = draggedItem.getAttribute('data-sound');
                const sound = zone.getAttribute('data-sound');
                if (letter === sound) {
                    zone.classList.add('matched');
                    draggedItem.draggable = false;
                    draggedItem.style.visibility = 'hidden'; // הסתרת האות לאחר התאמה
                    feedback.textContent = "מעולה! התאמת נכון.";
                    successSound.play();
                } else {
                    feedback.textContent = "ניסיון נוסף.";
                    errorSound.play();
                }
            }
        });
    });
});
// script.js

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const feedback = document.getElementById('feedback');
    const successSound = document.getElementById('success-sound');
    const errorSound = document.getElementById('error-sound');

    let draggedItem = null;
    let correctMatches = 0;
    let totalMatches = dropZones.length;

    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.classList.add('dragging');
            }, 0);
        });

        item.addEventListener('dragend', () => {
            draggedItem = null;
            item.classList.remove('dragging');
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('over');
        });

        zone.addEventListener('drop', () => {
            zone.classList.remove('over');
            if (draggedItem) {
                const letter = draggedItem.getAttribute('data-sound');
                const sound = zone.getAttribute('data-sound');
                if (letter === sound) {
                    zone.classList.add('matched');
                    draggedItem.draggable = false;
                    draggedItem.style.visibility = 'hidden'; // הסתרת האות לאחר התאמה
                    correctMatches += 1;
                    feedback.textContent = `מעולה! התאמת נכון. התקדמות: ${correctMatches}/${totalMatches}`;
                    successSound.play();

                    // בדיקה אם המשחק הסתיים
                    if (correctMatches === totalMatches) {
                        feedback.textContent += " כל הכבוד! סיימת את המשחק.";
                    }
                } else {
                    feedback.textContent = "ניסיון נוסף.";
                    errorSound.play();
                }
            }
        });
    });
});
// script.js

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const feedback = document.getElementById('feedback');
    const successSound = document.getElementById('success-sound');
    const errorSound = document.getElementById('error-sound');

    let draggedItem = null;
    let correctMatches = 0;
    const totalMatches = dropZones.length;

    // טעינת התקדמות מה-LocalStorage
    if (localStorage.getItem('correctMatches')) {
        correctMatches = parseInt(localStorage.getItem('correctMatches'), 10);
        feedback.textContent = `התאמות נכונות: ${correctMatches}/${totalMatches}`;
    }

    items.forEach(item => {
        // בדיקת אם האות כבר הותאמה
        if (item.getAttribute('data-matched') === 'true') {
            item.style.visibility = 'hidden';
            item.draggable = false;
        }

        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.classList.add('dragging');
            }, 0);
        });

        item.addEventListener('dragend', () => {
            draggedItem = null;
            item.classList.remove('dragging');
        });
    });

    dropZones.forEach(zone => {
        // בדיקת אם אזור השחרור כבר הותאם
        if (zone.classList.contains('matched')) {
            correctMatches += 1;
        }

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('over');
        });

        zone.addEventListener('drop', () => {
            zone.classList.remove('over');
            if (draggedItem) {
                const letter = draggedItem.getAttribute('data-sound');
                const sound = zone.getAttribute('data-sound');
                if (letter === sound && !zone.classList.contains('matched')) {
                    zone.classList.add('matched');
                    draggedItem.draggable = false;
                    draggedItem.style.visibility = 'hidden'; // הסתרת האות לאחר התאמה
                    draggedItem.setAttribute('data-matched', 'true');
                    correctMatches += 1;
                    feedback.textContent = `מעולה! התאמת נכון. התקדמות: ${correctMatches}/${totalMatches}`;
                    localStorage.setItem('correctMatches', correctMatches);
                    successSound.play();

                    // בדיקה אם המשחק הסתיים
                    if (correctMatches === totalMatches) {
                        feedback.textContent += " כל הכבוד! סיימת את המשחק.";
                        // אפשרות למחיקת ההתקדמות
                        // localStorage.removeItem('correctMatches');
                    }
                } else if (letter !== sound) {
                    feedback.textContent = "ניסיון נוסף.";
                    errorSound.play();
                }
            }
        });
    });
});
