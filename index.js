var datespan = document.getElementById("bg-date"),
    monthspan = document.getElementById("bg-month"),
    today = new Date(),
    month = today.getMonth(),
    date = today.getDate(),
    monthNames = ['January', 'February', 'March',
        'April', 'May', 'June',
        'July', 'August', 'September',
        'October', 'November', 'December'
    ];

function prefix(n) {
    return (n < 10) ? ("0" + n) : n.toString();
}


datespan.textContent = prefix(date);
monthspan.textContent = monthNames[month].slice(0,3)+"."+ today.getFullYear();
