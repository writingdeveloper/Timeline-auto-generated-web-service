/* Project Init Settings */

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

    // Select Tag의 선택된 데이터를 가져옴
    let subject = td.eq(0).text();
    let x = document.getElementById(subject).value;


    // 선택된 수강항목 테이블에 삽입
    subjectCode.innerHTML = td.eq(0).text();
    subjectName.innerHTML = td.eq(1).text();
    credit.innerHTML = Number(td.eq(2).text());
    major.innerHTML = td.eq(3).text();
    day.innerHTML = x;
    time.innerHTML = td.eq(5).text();
    deleteButton.innerHTML = "<button>삭제</button>";

    // 삭제버튼 클릭시 수강항목 테이블에서 데이터 제거
    $('button').click(function () {
        $(this).parents('tr').first().remove();
    });

    // 수강항목 테이블의 총 수강학점
    let totalCredit = Number(td.eq(2).text());
    $('#counter').html((function () {
        var $this = $(this),
            count = $this.data('count') + totalCredit;
        console.log(count);

        $this.data('count', count);
        CreditCheck(count); // 21학점 이상인 경우 경고창 출력
        return '총 수강학점 : ' + count;
    }))

    // 과목코드 배열 생성 (중복 체크 용)
    let sbjCodeArr=new Array();
    sbjCodeArr.push(td.eq(0).text());
    console.log(sbjCodeArr);

    // 선택된 데이터 전달용 배열 생성 (요일 포함)
    let tdArr = [td.eq(0).text(), td.eq(1).text(), Number(td.eq(2).text()), td.eq(3).text(), x, td.eq(5).text()];
    console.log(tdArr);
})

// Single Click Select Event to Timeline
$('#subjectList tr').click(function () {


    let dayArray = new Array(); // 클릭된 요일 배열 생성
    let timeArray = new Array(); // 클릭된 교시 배열 생성

    // 현재 클릭된 Row(<tr>)
    var tr = $(this);
    var td = tr.children();

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
        let timelineColor = getRamdomColor();
        table.style.backgroundColor = timelineColor;
        table1.style.backgroundColor = timelineColor;
    }
})