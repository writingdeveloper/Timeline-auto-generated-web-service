/* Project Init Settings */
let sbjCodeArr = new Array();
let count = 0;
let dataArr = new Array();
let finalData='';

// 타임라인 중복과목 체크용 배열
let checkCollision = new Array();

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

// // 카운터 초기설정 및 초기화
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


// Add Subject Button Click Event
$('.checkBtn').click(function () {

    let checkBtn = $(this);

    let tr = checkBtn.parent().parent();
    let td = tr.children();

    let table = document.getElementById('subjectSelectBody');
    let row = table.insertRow();

    let dayArray = new Array(); // 클릭된 요일 배열 생성
    let timeArray = new Array(); // 클릭된 교시 배열 생성
    let newDayArray = new Array(); //
    let newTimeArray = new Array();

    // 수강항목 테이블의 총 수강학점
    // let totalCredit = Number(td.eq(2).text());
    // $('#counter').html((function () {
    //     var $this = $(this),
    //         count = $(this).data('count') + totalCredit;

    //     console.log(count);
    //     $this.data('count', count);



    //     if (count < 21) {
    //         return '총 수강학점 : ' + count; // 현재 신청된 총 학점 출력
    //     }
    //     // CreditCheck(count); 
    //     alert('최대 수강학점은 21학점입니다'); // 21학점 이상인 경우 경고창 출력
    //     count = 21; // 학점 초기화
    //     return '총 수강학점 : ' + count; // 21학점으로 초기화
    // }))

    // 선택된 데이터 요일, 시간 배열생성 (요일 포함)

    let changeday;
    let changeday1;
    switch (td.eq(4).text().substring(0, 3)) {
        case '월요일':
            changeday = 'mon';
            break;
        case '화요일':
            changeday = 'tue';
            break;
        case '수요일':
            changeday = 'wed';
            break;
        case '목요일':
            changeday = 'tur';
            break;
        case '금요일':
            changeday = 'fri';
            break;
    }
    switch (td.eq(4).text().substring(4, 7)) {
        case '월요일':
            changeday1 = 'mon';
            break;
        case '화요일':
            changeday1 = 'tue';
            break;
        case '수요일':
            changeday1 = 'wed';
            break;
        case '목요일':
            changeday1 = 'tur';
            break;
        case '금요일':
            changeday1 = 'fri';
            break;
    }

    let newDay = changeday + td.eq(5).text().substring(0, 1);
    let newDay1 = changeday1 + td.eq(5).text().substring(2, 3);
    let newDay2 = changeday + (Number(td.eq(5).text().substring(0, 1)) + 1);
    let newDay3 = changeday1 + (Number(td.eq(5).text().substring(2, 3)) + 1);

    if (checkCollision.indexOf(newDay) == -1 && checkCollision.indexOf(newDay1) == -1 && checkCollision.indexOf(newDay2) == -1 && checkCollision.indexOf(newDay3) == -1) {
        checkCollision.push(newDay, newDay1, newDay2, newDay3);
        console.log(checkCollision);
        // 추가된 과목 중복검사
        let newPush = td.eq(0).text();
        //add if it is not in the array, and sends a warning if
        if (sbjCodeArr.indexOf(newPush) == -1) {
            //If the array does not have this element
            sbjCodeArr.push(newPush);

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
            $(`#${subject} option`).each(function () {
                newDayArray.push($(this).val());
            });
            console.log(newDayArray);
            $(`#${subject}Time option`).each(function () {
                newTimeArray.push($(this).val());
            });
            console.log(newTimeArray);
            // 선택된 데이터 배열 생성 (요일 포함)
            let tdArr = [td.eq(0).text(), td.eq(1).text(), Number(td.eq(2).text()), td.eq(3).text(), newDayArray[0], newDayArray[1], newTimeArray[0], newTimeArray[1], $('#userId').text()];
            console.log(tdArr);

            // 선택된 수강항목 테이블에 삽입
            subjectCode.innerHTML = td.eq(0).text();
            subjectName.innerHTML = td.eq(1).text();
            credit.innerHTML = Number(td.eq(2).text());
            major.innerHTML = td.eq(3).text();
            day.innerHTML = newDayArray[0] + ' ' + newDayArray[1];
            time.innerHTML = td.eq(5).text();
            deleteButton.innerHTML = `<button id="remove_button">삭제</button>`;

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

                console.log(clickDay);
                $(`#${clickDay}`).text(td.eq(1).text());

                let table = document.getElementById(clickDay);
                let table1 = document.getElementById(clickDay1);

                table.style.backgroundColor = timelineColor;
                table1.style.backgroundColor = timelineColor;

            }
            
            let userIdData=$('#userId').text();
            let sbjCodeData=td.eq(0).text();
            let sjbNameData=td.eq(1).text();
            // SQL 데이터 생성
            finalData += `('${userIdData}','${sbjCodeData}','${sjbNameData}'),`;
            console.log(finalData);
            // 서버로 전달될 데이터 전달용 코드
            $(`#data`).attr('value', finalData.slice(0, -1));

        } else {
            //If the array already has this element
            alert(`${newPush} 과목은 이미 수강신청 항목에 추가된 과목입니다.`)
            sbjCodeArr.pop(newPush);
        }
        //throws the value of the new array in the console for verification
        console.log(sbjCodeArr);
    } else {
        alert('선택한 항목과 시간이 충돌합니다');
        console.log(checkCollision);
    }

    // 삭제버튼 클릭시 수강항목 테이블에서 데이터 제거
    $('button').click(function () {
        let removeCredit = Number($('#remove_button').parents('tr').children('td:eq(2)').text());
        console.log(`삭제된 학점 : ${removeCredit}`);


        let clickTime = $(this).parents('tr').children('td:eq(5)').text().substring(0, 1);
        console.log(clickTime);
        let clickTime1 = $(this).parents('tr').children('td:eq(5)').text().substring(2, 3);
        console.log(clickTime1);
        let clickDay = $(this).parents('tr').children('td:eq(4)').text().substring(0, 3);
        console.log(clickDay);
        let clickDay1 = $(this).parents('tr').children('td:eq(4)').text().substring(4, 7);
        console.log(clickDay1);

        let day;
        let day1;
        switch (clickDay) {
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
        switch (clickDay1) {
            case '월요일':
                day1 = 'mon';
                break;
            case '화요일':
                day1 = 'tue';
                break;
            case '수요일':
                day1 = 'wed';
                break;
            case '목요일':
                day1 = 'tur';
                break;
            case '금요일':
                day1 = 'fri';
                break;
        }

        // 삭제되는 테이블 ID값 출력
        // console.log((day + clickTime) + ' ' + (day1 + clickTime1));

        // 삭제된
        let firstTable = document.getElementById(day + clickTime);
        let firstTable1 = document.getElementById(day1 + Number(clickTime1));
        let secondTable = document.getElementById(day + (Number(clickTime) + 1));
        let secondTable1 = document.getElementById(day1 + (Number(clickTime1) + 1));
        console.log((day + clickTime), (day + (Number(clickTime) + 1)), (day1 + clickTime1), (day + (Number(clickTime1) + 1)));

        // 시간표 충돌 확인 배열에서 요일 교시 데이터 삭제
        checkCollision.pop(day + clickTime);
        checkCollision.pop(day + (Number(clickTime) + 1));
        checkCollision.pop(day1 + clickTime1);
        checkCollision.pop(Number(clickTime1) + 1);
        sbjCodeArr.pop(day + clickTime)
        sbjCodeArr.pop(day + (Number(clickTime) + 1))
        sbjCodeArr.pop(day1 + clickTime1)
        sbjCodeArr.pop(Number(clickTime1) + 1)


        // 삭제된 과목 시간표에서 색상 초기화
        firstTable.style.backgroundColor = '#fff';
        firstTable1.style.backgroundColor = '#fff';
        secondTable.style.backgroundColor = '#fff';
        secondTable1.style.backgroundColor = '#fff';

        // 삭제된 과목 시간표에서 텍스트 초기화
        $(`#${day+clickTime}`).text('');
        $(`#${day1+clickTime1}`).text('');

        // checkCollision.pop()
        // sbjCodeArr.pop(newPush); // 과목 중복체크 배열에서 새로 추가된 요소 삭제
        $(this).parents('tr').first().remove(); // 선택된 수강항목 목록에서 tr 요소 삭제

    });
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