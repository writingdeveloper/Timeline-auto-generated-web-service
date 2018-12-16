/* Project Init Settings */
let sbjCodeArr = new Array(); // 중복 체크용 배열
let checkCollision = new Array(); // 타임라인 중복과목 체크용 배열
let count = 0; // 학점 카운트
let finalData = ''; // 최종적으로 SQL에서 사용될 Value 값

/* 랜덤 컬러 생성 함수 타임라인에서 사용하는 각각의 칸 색깔 생성 */
function getRamdomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color; // 호출될때마다 다른 색상을 return
}

// 카운터 초기설정 및 초기화
$('#counter').data('count', 0);

// 과목리스트에서 클릭된 Row 색상 Toggle 함수
function selectList() {
    let index,
        table = document.getElementById('subjectList');
    // Toggle List Highlight
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            if (typeof index !== "undefined") {
                table.rows[index].classList.toggle("highlight"); // CSS Highlight Toggle
            }
            // console.log(typeof index);
            index = this.rowIndex; // 선택된 Row의 index 값
            // add class selected to the row
            this.classList.toggle("highlight");
            // console.log(typeof index);
        };
    }
}
selectList();

/* 수강신청 버튼을 클릭하였을때 */
$('.checkBtn').click(function () {
    let checkBtn = $(this);
    let tr = checkBtn.parent().parent();
    let td = tr.children();
    let table = document.getElementById('subjectSelectBody'); // 출력될 테이블 ID 선택
    let row = table.insertRow();
    // 요일 배열 생성
    let dayArray = new Array();
    let timeArray = new Array();
    let newDayArray = new Array();
    let newTimeArray = new Array();

    // HTML id값으로 사용하기 위해 데이터 변경
    const days = {
        '월요일': 'mon',
        '화요일': 'tue',
        '수요일': 'wed',
        '목요일': 'tur',
        '금요일': 'fri',
    };
    const changeday = days[td.eq(4).text().substring(0, 3)];
    const changeday1 = days[td.eq(4).text().substring(4, 7)];

    let newDay = changeday + td.eq(5).text().substring(0, 1);
    let newDay1 = changeday1 + td.eq(5).text().substring(2, 3);
    let newDay2 = changeday + (Number(td.eq(5).text().substring(0, 1)) + 1);
    let newDay3 = changeday1 + (Number(td.eq(5).text().substring(2, 3)) + 1);

    let newPush = td.eq(0).text(); // 선택된 항목 Table에서 중복 체크용 과목코드
    // 시간표에서 충돌되는 과목을 확인 (추가된 항목들에 대해서 배열 생성후 새로 클릭된 요소의 배열과 비교하여 동일할목이 있을 경우 충돌과목으로 확인)
    if (checkCollision.indexOf(newDay) == -1 && checkCollision.indexOf(newDay1) == -1 && checkCollision.indexOf(newDay2) == -1 && checkCollision.indexOf(newDay3) == -1) {
        if (sbjCodeArr.indexOf(newPush) == -1) { // 과목중복 검사
            if (count > 21) {
                alert('21학점 이상은 신청할수 없습니다');
            } else {
                checkCollision.push(newDay, newDay1, newDay2, newDay3); // 시간표 충돌 검사용 배열에 요소 추가
                sbjCodeArr.push(newPush); // 과목 중복 검사용 배열에 요소 추가

                // 총 수강학점 계산
                // 수강신청 카운터
                count += Number(td.eq(2).text());
                console.log(`추가된 수강학점 : ${count}`);
                $('#counter').text(`총 수강학점 : ${count}`);
                // 선택된 변수를 선택된 Table 항목에 저장
                let subjectCode = row.insertCell(0);
                let subjectName = row.insertCell(1);
                let credit = row.insertCell(2);
                let major = row.insertCell(3);
                let day = row.insertCell(4);
                let time = row.insertCell(5);
                let deleteButton = row.insertCell(6);
                // Select Tag의 선택된 데이터를 가져옴 (요일, 시간 항목이 2개인경우 Hidden Select에 저장됨)
                let subject = td.eq(0).text();
                $(`#${subject} option`).each(function () {
                    newDayArray.push($(this).val());
                });
                $(`#${subject}Time option`).each(function () {
                    newTimeArray.push($(this).val());
                });
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
                deleteButton.innerHTML = `<button id="remove_${td.eq(0).text()}">삭제</button>`;


                // 클릭된 항목의 Select 태그에서 Hidden 속성을 가지고 있는 데이터를 가져옴
                let clickedItem = td.eq(0).text();
                $('#' + clickedItem + ' option').each(function () {
                    dayArray.push($(this).val());
                });
                $('#' + clickedItem + 'Time option').each(function () {
                    timeArray.push($(this).val());
                });

                let timelineColor = getRamdomColor(); // 랜덤 색상 함수를 호출하여 색상 데이터 저장

                // 가져온 데이터를 HTML id값으로 변경하기위하여 switch 문으로 day값 변경
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
                    // 변환된 요일을 클릭된 요일에 저장
                    let clickDay = day + timeArray[i];
                    let clickDay1 = day + (Number(timeArray[i]) + 1);
                    $(`#${clickDay}`).text(td.eq(1).text());
                    let table = document.getElementById(clickDay);
                    let table1 = document.getElementById(clickDay1);

                    // 1~2학점의 데이터의 경우 table값이 Null이되는 항목들이 발생함
                    if (table === null) {
                        console.log('1~2학점 항목을 선택하였습니다');
                    } else {
                        // 1~2학점의 데이터의 경우 칸 두 개만 CSS변경
                        table.style.backgroundColor = timelineColor;
                        table1.style.backgroundColor = timelineColor;
                    }
                }
                // SQL Value값으로 전달할 변수 생성
                let userIdData = $('#userId').text();
                let sbjCodeData = td.eq(0).text();
                let sjbNameData = td.eq(1).text();
                // SQL 데이터 생성
                finalData += `('${userIdData}','${sbjCodeData}','${sjbNameData}'),`;
                console.log(finalData);
                // 서버로 전달될 데이터 전달용 코드
                $(`#data`).attr('value', finalData.slice(0, -1)); // 마지막 항목의 경우 쉼표가 추가되므로 , 제거
            }
        } else {
            // 이미 해당 과목이 추가되었을 경우
            alert(`${newPush} 과목은 이미 수강신청 항목에 추가된 과목입니다.`)
            sbjCodeArr.pop(newPush); // 배열에서 추가된 요소 삭제
        }
        console.log(sbjCodeArr);
    } else {
        alert('선택한 항목과 시간이 충돌합니다');
        console.log(checkCollision);
    }


    // 삭제버튼 클릭시 수강항목 테이블에서 데이터 제거
    $(`#remove_${td.eq(0).text()}`).click(function () {
        // 삭제시 총 수강 학점 계산
        count = count - Number($(`#remove_${td.eq(0).text()}`).parents('tr').children('td:eq(2)').text());
        console.log(`삭제 후 수강학점 : ${count}`);
        // 삭제 버튼 클릭시 삭제된 학점 HTML에 반영
        $('#counter').text(`총 수강학점 : ${count}`);

        // 버튼이 클릭된 항목들에 대해서 선택된 항목에 추가하기 위해 변수 생성
        let clickTime = $(this).parents('tr').children('td:eq(5)').text().substring(0, 1);
        let clickTime1 = $(this).parents('tr').children('td:eq(5)').text().substring(2, 3);
        let clickDay = $(this).parents('tr').children('td:eq(4)').text().substring(0, 3);
        let clickDay1 = $(this).parents('tr').children('td:eq(4)').text().substring(4, 7);

        // 과목들에 대해서 HTML에서 사용할 id값으로 변경
        const days = {
            '월요일': 'mon',
            '화요일': 'tue',
            '수요일': 'wed',
            '목요일': 'tur',
            '금요일': 'fri',
        };
        const day = days[clickDay];
        const day1 = days[clickDay1];

        // 삭제할 선택된 요소
        let firstTable = document.getElementById(day + clickTime);
        let firstTable1 = document.getElementById(day1 + Number(clickTime1));
        let secondTable = document.getElementById(day + (Number(clickTime) + 1));
        let secondTable1 = document.getElementById(day1 + (Number(clickTime1) + 1));
        // console.log((day + clickTime), (day + (Number(clickTime) + 1)), (day1 + clickTime1), (day + (Number(clickTime1) + 1)));
        // console.log(firstTable, firstTable1, secondTable, secondTable1);

        // 시간표 충돌 확인 배열에서 요일 교시 데이터 삭제
        checkCollision.pop(day + clickTime);
        checkCollision.pop(day + (Number(clickTime) + 1));
        checkCollision.pop(day1 + clickTime1);
        checkCollision.pop(Number(clickTime1) + 1);
        sbjCodeArr.pop(day + clickTime)
        sbjCodeArr.pop(day + (Number(clickTime) + 1))
        sbjCodeArr.pop(day1 + clickTime1)
        sbjCodeArr.pop(Number(clickTime1) + 1)

        // 1~2학점의 항목들에 대한 시간표 색상 초기화 (최종적으로 2칸)
        if (firstTable1 === null || secondTable1 === null) {
            firstTable.style.backgroundColor = '#fff';
            secondTable.style.backgroundColor = '#fff';
            console.log('Single Item');
            // 3학점 이상의 과목들에 대한 시간표 색상 초기화 (최종적으로 4칸)
        } else {
            firstTable.style.backgroundColor = '#fff';
            firstTable1.style.backgroundColor = '#fff';
            secondTable.style.backgroundColor = '#fff';
            secondTable1.style.backgroundColor = '#fff';
        }

        // 삭제된 과목 시간표에서 텍스트 초기화
        $(`#${day+clickTime}`).text('');
        $(`#${day1+clickTime1}`).text('');

        // 최종적으로 UI상에서 선택된 수강항목 목록에서 TR 태그 삭제
        $(this).parents('tr').first().remove(); // 선택된 수강항목 목록에서 tr 요소 삭제

    });
})


// 각 행을 클릭하였을 경우 임시 예상 시간표 출력
$(document).ready(function () {
    // 선택된 subjectList tr 태그를 클릭하였을 경우
    $('#subjectList tr').click(function () {
        // 현재 클릭된 Row(<tr>)
        let tr = $(this);
        let td = tr.children();
        let day = td.eq(4).text().substring(0, 3);
        let day1 = td.eq(4).text().substring(4, 7);
        let time = Number(td.eq(5).text().substring(0, 1));
        let time1 = Number(td.eq(5).text().substring(2, 3));
        let dayArray = [day, day1];
        let timeArray = [time, time1];
        // 설정된 시간표 초기화 (매번 클릭할경우)
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

            // 클릭된 과목에 대한 임시 시간표를 table에 표시
            let clickDay = day + timeArray[i];
            let clickDay1 = day + (Number(timeArray[i]) + 1);
            $(`#${clickDay}`).css('border', '3px solid red');
            $(`#${clickDay1}`).css('border', '3px solid red');
        }
    })
})