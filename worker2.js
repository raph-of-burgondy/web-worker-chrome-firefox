onmessage = function(evt) {

  try {} catch(e) {} //keep ths !!!! without will take  very much  time on firefox.....
	
	const f = evt.data
	const  ar = new ArrayBuffer(4*f.width*f.height)
	const  clamped = new Uint8ClampedArray(ar)
	const stepx = (f.xmax-f.xmin)/f.width
	const  stepy = (f.ymax-f.ymin)/f.height


	for (let j = 0; j<f.height; j++) {
    const ic = f.ymin + j*stepy
		for (let i = 0; i<f.width; i++) {
			const rc = f.xmin + i*stepx
			var rz = 0
      var iz = 0
      var n = 0
			while (true) {
				var rt= rz*rz-iz*iz + rc
				iz = 2*rz*iz + ic
				rz=rt
				n++
				if (n>1002 || rz*rz+iz*iz>4) {
          var colors = new Array()
          if (n >= 1002) {
            colors.push(0,0,0,255)

          } else {
            const h=100
            const N=n%(12*h)
            const r=N%h
            const q=Math.floor(N/h)
            switch (q) {
              case 0:colors.push(r*255/h, 0, 0, 255);break
              case 1:colors.push(255*r/h, 128*r/h, 0, 255);break
              case 2:colors.push(255*r/h, 255*r/h, 0, 255);break
              case 3:colors.push(128*r/h, 255*r/h, 0, 255);break
              case 4:colors.push(0, 255*r/h, 0, 255);break
              case 5:colors.push(0, 255*r/h, 128*r/h, 255);break
              case 6:colors.push(0, 255*r/h, 255*r/h, 255);break
              case 7:colors.push(0, 128*r/h, 255*r/h, 255);break
              case 8:colors.push(0, 0, 255*r/h, 255);break
              case 9:colors.push(128*r/h, 0, 255*r/h, 255);break
              case 10:colors.push(255*r/h, 0, 255*r/h, 255);break
              case 11:colors.push(255*r/h, 0, 128*r/h, 255);break
            }
          }
          clamped.set(colors,4*(i+j*f.width))
          break
				}
			}
		}

	}


	postMessage(ar,[ar])

}
