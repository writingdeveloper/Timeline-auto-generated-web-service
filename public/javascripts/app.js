/* Project Init Settings */
let sbjCodeArr = new Array();

// Total Credit Check Function
function CreditCheck(count) {
    if (count > 21) {
        alert('수강가능한 총 최대학점은 21학점입니다');
        return 21;
    }
}

/* 랜덤 컬러 생성 함수
타임라인에서 사용하는 각각의 칸 색깔 생성
*/

function getRamdomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 카운터 초기설정 및 초기화
$('#counter').data('count', 0);

// Single Click Event Function
function selectList() {
    let index,
        table = document.getElementById('subjectList');

    // Toggle List Highlight
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            if (typeof index !== "undefined") {
                table.rows[index].classList.toggle("highlight");
            }
            // console.log(typeof index);
            // get the selected row index
            index = this.rowIndex;
            // add class selected to the row
            this.classList.toggle("highlight");
            // console.log(typeof index);
        };
    }
}
selectList();
// Timeline Event 초기화


// Add Subject Button Click Event
$('.checkBtn').click(function () {

    let checkBtn = $(this);

    let tr = checkBtn.parent().parent();
    let td = tr.children();

    let table = document.getElementById('subjectSelectBody');
    let row = table.insertRow();

    let subjectCode = row.insertCell(0);
    let subjectName = row.insertCell(1);
    let credit = row.insertCell(2);
    let major = row.insertCell(3);
    let day = row.insertCell(4);
    let time = row.insertCell(5);
    let deleteButton = row.insertCell(6);

    let dayArray = new Array(); // 클릭된 요일 배열 생성
    let timeArray = new Array(); // 클릭된 교시 배열 생성
    let newDayArray = new Array(); //
    let newTimeArray = new Array();


    //variable with the new value to be added in the array
    let newPush = td.eq(0).text();

    //add if it is not in the array, and sends a warning if
    if (sbjCodeArr.indexOf(newPush) == -1) {
        //If the array does not have this element
        sbjCodeArr.push(newPush);

        // Select Tag의 선택된 데이터를 가져옴
    let subject = td.eq(0).text();
    let x = document.getElementById(subject).value;
    $(`#${subject} option`).each(function () {
        newDayArray.push($(this).val());
    });
    console.log(newDayArray);
    $(`#${subject}Time option`).each(function () {
        newTimeArray.push($(this).val());
    });
    console.log(newTimeArray);
    // 선택된 데이터 배열 생성 (요일 포함)
    let tdArr = [td.eq(0).text(), td.eq(1).text(), Number(td.eq(2).text()), td.eq(3).text(), newDayArray[0], newDayArray[1], newTimeArray[0], newTimeArray[1]];
    console.log(tdArr);

    // 선택된 수강항목 테이블에 삽입
    subjectCode.innerHTML = td.eq(0).text();
    subjectName.innerHTML = td.eq(1).text();
    credit.innerHTML = Number(td.eq(2).text());
    major.innerHTML = td.eq(3).text();
    day.innerHTML = newDayArray[0] + ' ' + newDayArray[1];
    time.innerHTML = td.eq(5).text();
    deleteButton.innerHTML = "<button>삭제</button>";

    let clickedItem = td.eq(0).text();
    console.log(clickedItem);
    $('#' + clickedItem + ' option').each(function () {
        dayArray.push($(this).val());
    });
    console.log(dayArray);
    $('#' + clickedItem + 'Time option').each(function () {
        timeArray.push($(this).val());
    });
    console.log(timeArray);

    let timelineColor = getRamdomColor();
    for (i = 0; i < dayArray.length; i++) {
        let day;

        switch (dayArray[i]) {
            case '월요일':
                day = 'mon';
                break;
            case '화요일':
                day = 'tue';
                break;
            case '수요일':
                day = 'wed';
                break;
            case '목요일':
                day = 'tur';
                break;
            case '금요일':
                day = 'fri';
                break;
        }

        // I moved these variables into the loop too

        let clickDay = day + timeArray[i];
        let clickDay1 = day + (Number(timeArray[i]) + 1);

        let table = document.getElementById(clickDay);
        let table1 = document.getElementById(clickDay1);

        table.style.backgroundColor = timelineColor;
        table1.style.backgroundColor = timelineColor;
    }

    // 삭제버튼 클릭시 수강항목 테이블에서 데이터 제거
    $('button').click(function () {
        $(this).parents('tr').first().remove();
    });

    // 수강항목 테이블의 총 수강학점
    let totalCredit = Number(td.eq(2).text());
    $('#counter').html((function () {
        var $this = $(this),
            count = $(this).data('count') + totalCredit;
        console.log(count);

        $this.data('count', count);
        CreditCheck(count); // 21학점 이상인 경우 경고창 출력
        return '총 수강학점 : ' + count;
    }))
    
    } else {
        //If the array already has this element
        alert("Array already has " + newPush)
    }

    //throws the value of the new array in the console for verification
    console.log(sbjCodeArr);

    
})

// Single Click Select Event to Timeline
$(document).ready(function () {
    $('#subjectList tr').click(function () {


        // 현재 클릭된 Row(<tr>)
        let tr = $(this);
        let td = tr.children();
        let day = td.eq(4).text().substring(0, 3);
        let day1 = td.eq(4).text().substring(4, 7);
        let time = Number(td.eq(5).text().substring(0, 1));
        let time1 = Number(td.eq(5).text().substring(2, 3));
        console.log(day);
        console.log(day1);
        console.log(time);
        console.log(time1);
        let dayArray = [day, day1];
        let timeArray = [time, time1];
        // 설정된 시간표 초기화 (클릭시)
        $('#timeline tr td').css('border', '1px solid #dee2e6');
        for (i = 0; i < dayArray.length; i++) {
            let day;
            switch (dayArray[i]) {
                case '월요일':
                    day = 'mon';
                    break;
                case '화요일':
                    day = 'tue';
                    break;
                case '수요일':
                    day = 'wed';
                    break;
                case '목요일':
                    day = 'tur';
                    break;
                case '금요일':
                    day = 'fri';
                    break;
            }

            let clickDay = day + timeArray[i];
            let clickDay1 = day + (Number(timeArray[i]) + 1);
            $(`#${clickDay}`).css('border', '3px solid red');
            $(`#${clickDay1}`).css('border', '3px solid red');
        }
    })
})