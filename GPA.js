$('#gpa-add').click(Add)
$('#gpa-calc').click(Calc)
$('#gpa-clear').click(clearResults)

function Add() {
	var row = "<tr><td><button type='button' class='gpa-del btn btn-danger'><span class='glyphicon glyphicon-minus'></span></button></td>"
			+ "<td><input type='text' name='gpa-subject' class='form-control'/></td>"
			+ "<td><input type='text' name='gpa-grade' value='0' class='form-control'/></td>"
			+ "<td><input type='text' name='gpa-ch' value='1' class='form-control'/></td>"
			+ "</tr>";

	$('#gpa-table tbody tr:first').before(row);
	$('.gpa-del').bind('click', Del);
}
function Del() {
	var par = $(this).parent().parent(); // tr
	par.remove();
}
function Calc() {
	clearResults();
	var usGrades = [];
	var gradesXch = [];
	var sumCh = 0;
	var sumM = 0;
	$("input[name='gpa-grade']").each(function(index, element) {
		// element == this
		var grade = parseFloat($(this).val());
		usGrades.push(convert(grade));
	});
	$("input[name='gpa-ch']").each(function(index, element) {
		var ch = parseInt($(this).val());
		var m = usGrades[index] * ch;
		gradesXch.push(m);
		sumCh += ch;
	});
	for (var i = 0; i < gradesXch.length; i++) {
		sumM += gradesXch[i];
	}
	var gpa = sumM / sumCh;

	// Resumo
	var row = "<tr><td>" + sumCh + "</td><td>" + gpa + "</td></tr>";
	$('#gpa-summary tbody').append(row);

	// Detalhamento
	$("input[name='gpa-subject']").each(
			function(index, element) {
				var subject = $(this).val();
				var grade = usGrades[index];
				var wl = gradesXch[index];
				var row = "<tr><td>" + subject + "</td><td>" + grade
						+ "</td><td>" + wl + "</td></tr>";
				$('#gpa-detail tbody').append(row);
			});

	// Display results
	$("#gpa-reference").css("display", "block");
	$("#gpa-summary").css("display", "table");
	$("#gpa-detail").css("display", "table");
}
function clearResults() {
	$('#gpa-summary tbody').empty();
	$('#gpa-detail tbody').empty();
	$("#gpa-summary").css("display", "none");
	$("#gpa-detail").css("display", "none");
	$("#gpa-reference").css("display", "none");
}
function convert(grade) {
	var usGrade = 0;
	if (grade <= 10 && grade >= 9) {
		usGrade = 4;
	} else if (grade < 9 && grade >= 7) {
		usGrade = 3;
	} else if (grade < 7 && grade >= 5) {
		usGrade = 2;
	} else if (grade < 5 && grade >= 3) {
		usGrade = 1;
	} else if (grade < 3 && grade >= 0) {
		usGrade = 0;
	}
	return usGrade;
}
clearResults();
