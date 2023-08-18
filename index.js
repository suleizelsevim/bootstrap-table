var tblData = [];
		var myLocalStorage;
		var idxArray = [];

		var pagination = 1;
		function loadData() {
			$.get("https://jsonplaceholder.typicode.com/todos/", function (data) {
				tblData = data;
				var pagination = $("#table").bootstrapTable("getOptions").pageNumber;
				setData(data);
			});
		}

		function setData(dataarr) {
			$("#table").bootstrapTable({
				data: dataarr,
				pagination: true,
				search: true,
				columns: [{}, {}, {}, {}, {}],
		//eklenen satırlar 
				dataPageNumber: pagination,
				onPageChange: function () {
					pagination = $("#table").bootstrapTable("getOptions").pageNumber;
				},
			});
			$("#table").bootstrapTable("selectPage", pagination);
		}

		window.onload = function () {
			loadData();
		};

		$(".close-button").on("click", function () {
			$("#edit-popup").css("display", "none");
		});

		// $("#btn-save").on("click", function () {
		// 	var adField = $("#form-input-name").val();
		// 	var soyadField = $("#form-input-surname").val();
		// 	var tblbody = $("#table-body");

		// 	var trElement = document.createElement("tr");
		// 	var tdElement = document.createElement("td");
		// 	tdElement.innerText = adField;
		// 	trElement.appendChild(tdElement);
		// 	var td2Element = document.createElement("td");
		// 	td2Element.innerText = soyadField;
		// 	trElement.appendChild(td2Element);
		// 	tblbody.append(trElement);
		// });

		// $("#getir-btn").on("click", function () {
		// 	// debugger;

		// 	// 	for (let index = 0; index < veri.length; index++) {
		// 	// 		var element = veri[index];
		// 	// 		var tblbody2 = $("#table-body");

		// 	// 		var trE = document.createElement("tr");
		// 	// 		var tdUserid = document.createElement("td");
		// 	// 		tdUserid.innerText = element.userId;

		// 	// 		var tdId = document.createElement("td");
		// 	// 		tdId.innerText = element.id;

		// 	// 		var tdTitle = document.createElement("td");
		// 	// 		tdTitle.innerText = element.title;

		// 	// 		var tdCompleted = document.createElement("td");
		// 	// 		tdCompleted.innerText = element.completed;

		// 	// 		trE.appendChild(tdUserid);
		// 	// 		trE.appendChild(tdId);
		// 	// 		trE.appendChild(tdTitle);
		// 	// 		trE.appendChild(tdCompleted);

		// 	// 		tblbody2.append(trE);
		// 	// 	}
		// 	var tblbody3 = $("#table-body");
		// 	// var temp = veri.map(function (a) {
		// 	// 	var tr1 = document.createElement("tr");

		// 	// 	var td1 = document.createElement("td");
		// 	// 	td1.innerText = a.userId;

		// 	// 	var td2 = document.createElement("td");
		// 	// 	td2.innerText = a.id;

		// 	// 	var td3 = document.createElement("td");
		// 	// 	td3.innerText = a.title;

		// 	// 	var td4 = document.createElement("td");
		// 	// 	td4.innerText = a.completed;

		// 	// 	tr1.append(td1);
		// 	// 	tr1.appendChild(td2);
		// 	// 	tr1.append(td3);
		// 	// 	tr1.append(td4);

		// 	// 	tblbody3.append(tr1);
		// 	// });
		// });

		$("#edit-button").attr("disabled", true);
		$("#delete-button").attr("disabled", true);
		
		

		$("#table").on("change", function () {
			var bb = $.map( //seçilen rowların indexlerini adxArray'e atar
				$("#table").bootstrapTable("getSelections"), 
				function (i, index) {
					return i.id;
				}
			);
			idx = $("[name=btSelectItem]:checked").attr("data-index");
			idxArray = bb;
		});

		$("#table").on("change", function () {
			var aa = $.map(
				$("#table").bootstrapTable("getSelections"),
				function (row) {
					return row.id;
				}
			);

			var count = 0;

			$.each(aa, function (index, value) { //her row seçildiğinde countu 1 arttırır
				count += 1;
			});
			if (count > 1) {
				$("#edit-button").attr("disabled", true);
				$("#delete-button").attr("disabled", false);
			} else if (count == 0) {
				$("#edit-button").attr("disabled", true);
				$("#delete-button").attr("disabled", true);
			} else {
				$("#edit-button").attr("disabled", false);
				$("#delete-button").attr("disabled", false);
			}
		});

		$("#edit-button").on("click", function () {
			$("#id-input").val(tblData[idx].id);  //tablodaki verileri input alanlarına doldurur
			$("#userId-input").val(tblData[idx].userId);
			$("#title-input").val(tblData[idx].title);
			isChecked = Boolean;
			tblData[idx].completed == true ? (isChecked = true) : (isChecked = false);
			$("#completed-input").attr("checked", isChecked);
			$("#edit-popup").removeAttr("style");
			$("#form").removeAttr("style");
		});


		$("#form").on("submit", function (event) {
			event.preventDefault(); //sayfanın yenilenmesini önler

			tblData[idx].userId = $("#userId-input").val();
			tblData[idx].id = $("#id-input").val();
			tblData[idx].title = $("#title-input").val();

			$("#completed-input").is(":checked")
				? (tblData[idx].completed = true)
				: (tblData[idx].completed = false);
			
			$("#edit-popup").css("display", "none");
			$("#edit-button").attr("disabled", true);
		$("#delete-button").attr("disabled", true);

			$("#table").bootstrapTable("destroy");
			setData(tblData);
		});

		$("#delete-button").on("click", function () {
			var ids = $.map( //seçili rowların idisini döndürüyor
				$("#table").bootstrapTable("getSelections"),
				function (row) {
					return row.id;
				}
			);
			$("#table").bootstrapTable("remove", { //tablodan silme işlemi
				field: "id",
				values: ids,
			});
			tblData = tblData.filter(function (item) { //idxArray'de idsi bulunmayan verileri döndürür
				return !idxArray.includes(item.id);
			});
			$("#edit-button").attr("disabled", true);
			$("#delete-button").attr("disabled", true);
			$table.bootstrapTable("selectPage", pagination);
		});

		// $("#search-btn").on("click", function () {
		// 	var arama = $("#search").val();

		// 	var selectedValue = $("#select-section option:selected").val();
		// 	var tblbody4 = $("#table-body");
		// 	tblbody4.empty();

		// 	var istedigimizVeri = tblData.filter(function (a) {
		// 		if (selectedValue == "completed") {
		// 			return a[selectedValue] == Boolean(arama);
		// 		} else if (selectedValue == "title") {
		// 			return a[selectedValue].includes(arama);
		// 		} else {
		// 			return a[selectedValue] == arama;
		// 		}
		// 	});

		// 	var temp = istedigimizVeri.map(function (a) {
		// 		var tr5 = document.createElement("tr");
		// 		var aa = document.createElement("td");
		// 		var td6 = document.createElement("td");
		// 		td6.innerText = a.userId;

		// 		var td7 = document.createElement("td");
		// 		td7.innerText = a.id;

		// 		var td8 = document.createElement("td");
		// 		td8.innerText = a.title;

		// 		var td9 = document.createElement("td");
		// 		td9.innerText = a.completed;
		// 		tr5.appendChild(aa);
		// 		tr5.appendChild(td6);
		// 		tr5.appendChild(td7);
		// 		tr5.appendChild(td8);
		// 		tr5.appendChild(td9);

		// 		tblbody4.append(tr5);
		// 	});
		// });