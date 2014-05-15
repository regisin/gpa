$('#gpa-add').click(Add)
$('#modalSubmit').click(Calc)
function Add() {
	var row = "<tr><td><button type='button'>-</button></td>"
			+ "<td><input type='text'/></td>"
			+ "<td><input type='text' name='gpa-grade' value='0' /></td>"
			+ "<td><input type='text' name='gpa-ch' value='1' /></td>"
			+ "</tr>";

	$('#gpa-table tbody tr:first').before(row);
	$('.gpa-del').bind('click', Del);
}
function Del() {
	var par = $(this).parent().parent(); // tr
	par.remove();
}
function Calc() {
	var usGrades = [];
	var gradesXch = [];
	var sumCh = 0;
	var sumM = 0;
	$("input[name='gpa-grade']").each(function(index, element) {
		// element == this
		var grade = parseFloat($(this).val());
		if (grade <= 100 && grade > 90) {
			usGrades.push(4);
		} else if (grade <= 90 && grade > 70) {
			usGrades.push(3);
		} else if (grade <= 70 && grade > 50) {
			usGrades.push(2);
		} else if (grade <= 50 && grade > 30) {
			usGrades.push(1);
		} else if (grade <= 30 && grade >= 0) {
			usGrades.push(0);
		}
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
	/*$("input[name='gpa-subject']").each(
			function(index, element) {
				var subject = $(this).val();
				var grade = usGrades[index];
				var wl = gradesXch[index];
				var row = "<tr><td>" + subject + "</td><td>" + grade
						+ "</td><td>" + wl + "</td></tr>";
				$('#gpa-detail tbody').append(row);
			});*/

	// Display result
	//$("#gpa-reference").css("display", "table");
	$("#gpa-summary").css("display", "table");
	//$("#gpa-detail").css("display", "table");
}

// RD
var origConversionSuccess = conversionSuccess;
conversionSuccess = function(resp) {
	origConversionSuccess(resp);
	try {
		_gaq.push([ '_trackPageview', '/calculadora-gpa/conversao' ]);
	} catch (err) {
	}
	Calc();
}