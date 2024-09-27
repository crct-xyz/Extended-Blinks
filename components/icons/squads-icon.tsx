import * as React from "react";
const SquadsIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		width={198}
		height={35}
		fill="none"
		{...props}
	>
		<path fill="url(#a)" d="M0 0h198v35H0z" />
		<defs>
			<pattern
				id="a"
				width={1}
				height={1}
				patternContentUnits="objectBoundingBox"
			>
				<use xlinkHref="#b" transform="matrix(.00333 0 0 .01886 0 -.056)" />
			</pattern>
			<image
				xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA7CAYAAADB2bfiAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABLKADAAQAAAABAAAAOwAAAADB/BrQAAAR9UlEQVR4Ae2dCbQUxRWGJe4iKigaFVdAXFBwAYKioEZFILgRAxrUnLhkcde4G3eJiSFqMGpy9LiLxiWKKBqJoAIBFXFBBUHEFRUXFNyCku9/TI81/bqrumeme+bx6p7z01V1b926dav6dlV1v2G55SqkJUuWtAW3gDdBFjQDpZdWaKav7j3gPdDcPUAg2RPMzyJKReicRtkWzd3nvv/eA94DZXiA4LEP+DoisGRZ9B7K25dhrq/iPeA90Fw9QNCoRbAKAqEPWs114vl+ew+k9UCNg5UPWmkHzMt7DyxDHmiRpi8KVsg/AFZKUy8j2Xno7dWiRYvZGen3ar0HvAfqzAOJA1adBavAjT5oBZ7wV++BZuCBRAGLYNUfXzwI3gFvgMWg1rQyBnQAsmU3Vlqv1dog3773gPdAjT1AsOoLZoNtamxKZPPYtV/BPgUvT94D3gPN1QMEgv7gDbBOPfsA+3qCt0HHerbT2+Y94D2QkQe4+RWsRP0yaqKqarHzUvAu8CutqnrWK/MeqHMPcNMH31l9UeemFs3D5u2ByH+nVfSKT3gPLOMe4Ibv13DbL/1nclPqrmH3PNJ+e9iUBs/b6j2Q1gPc5MHKKrj3J6TVUUt5jF4cGM7Vr7RqORi+be+BLD3ADR4OVrr3m3LAkv0+aGU5abxu74FaeIAbW8Eqip6qhT3lthnVAcp0EL9ZuTp9Pe8B74E68gA38xrgIxBFTX2FFfRpYh253JviPeA9UKYHVqDeJaBNTP0lMeX1Wrx8jGH6TmswX8OPjOHXvBj7WmHEWgaCvnxN2QLwqUAfcnlziz0taW9DsB4IbCFZQpofH4F3sevjEo7PNHsPMIc0dzSnW4NVCg75jqvmc8OcZt5oXicmBazeFulEf7pjqZ8361sajLu5doNXFwGLgdwaW/R92/ZgK9AJrAacRN3PEJoJZoDnwSMM+gtcKyL0boeCPqAX6AnagcREfQWsSeBJMA6bEr9hpu4x1BkC4uga9N0Zx0xSThvXICdfx9GRtDErjmmWo2sn8pebZZb0CPTebeHHsmjnWJiDYgXSMxQk3gFvFTAT26akV1NaAzvXpORA0A3Ix4KClZOoK5lgPk8n/SQ2PRRbkQo2WhbOsIL+jY91Qk4MDDkKzAwMquJVP099Flg1TVckD34DZoFqk84OzwZ6wloJmT85Gv+dVUECJvqnONromkBNgwh6HnboMtn6CwwtDFIT9a40FWWUXoje24EenqmIOp3BKFBt+hKFdwA9yEvoByW5xpmmuMJq3IulJcGSNI6fWTmObw0m08DfQccMGtoIndraz6GdHkn0IzcUubngatA+SZ2UMusjfzHQn3adkLJu3YrTl+4Y1zeFgdpWH5dC3hTN4/7T1l+r26n0TT9DrlWdk5C7EKEXwQCncHoB3auDwau0M8ys7gpYpqxPl++BcVTVRM+atAwfxyBb24Kv7dHNoG3WBqFf24UraFNP8UTb3hxsqqSJi8qofE6Zfc/7DLkLffsrtip4rRvXT3jnwDs3jl/l8jNob3ig0weswBMZXXG2/scfnQ/lRXo6XRfVGLZoC6gzi19F8TMu01N8Eu2vnnE7manHdj0I9i6jAb3UOqOMerWqou2httCNfqGFsm3hlRO0K+nLSbTbTQrK2ltX0nIzrJskOOiw9wmgQ/RXwTfApBXJdAB6caClsou6MsADOLzUb5iZpEDWMPBmYY5pBW6t7HRA2xRJW9xy6VTG5CrGZH4KBbVcUGyCnVqtb4nNehMckF6QuGgRAo8DHYNMB5+AMOmlTmfwc6Bts4tOR2CQD1guN1XAZ7A3pXprh4ojmBA3OWTE/je4Bp2ncFXgcZ0dDESmGLCotwt5nVslpRsRnAr0Vuk98AH4EFs/Q5cms7YMwsZAE0+6WwEXHUD9vdHzqEuwnvjYrLPBvSw23QbvK/DLGBm9EDkPpDnP+i5GV1B8OYnRQSbmqtVd2wL0wOgGNgVJaB2EdHxwsCHsejnxELIHMb7yRRLSlu9EBP/iED6ogY+wjSY4lNQVm46Yf0sY7peifa6EAVuHjYjIl3Wug54XInSZRY+ZnYUx0mRa0tfCc77ZM3UrTR1tN4dZ9Jqsf5n1YdT9W0JsHGt2IJT+jnx70A7Y5qB4m5p9t6WRdb0lPNJWP46H3i3B30BSKgYpKjzjqJRkBdbINHSe4tAr9gZ+hdXIdVUtWJRA2+HI6CmWlvanglY3cbQwYDDQOvj+WZC3XI/jyTjCwo9lUe9LmGfS1tNc74kVXMrQr8S2oc7HDrm6YGNrdwzZw2LMffRltvjIXs/l6BjZ5Sm/BBwaww8XZ/KWEFt17KDPWXS+qrFS/2x0FMzfFgS+sAnCOxi9Nxfmg0O0hK174NmSksaZBT5gNXZK1UoYtLkMnkufnnTHIzQGLDCEtaRWPoDOAT4S0DsfvE5aSEK9Ewjp48yygpWpGx330p+zKdONaaM+MO+1CdQR748OW84x+DqQPgKsZJSZyUPwzzD89JJZWIs0Nugbsf60PQNo6xhHfQzGHNK7GvlwUoH9ffQ+wnW6wfyWdDCXdf0U6IGluay/lFAgHAes5AOW1T1VYY5Ey2CHpi3hC4mIySC5D8H7YBbQU3IUg66JEEXbRhWGyi4I5cvOYsel2KigZdvu6tyr7gMW/dgdO20BfzT9fSVwFmkFgRvI2162KAD2C+pYrg0DbeFXzMLe+dirFyEnWpRtbfDuIn2YkY9KtqJwUAFR/JIy2ldec1fz+W0wFUwEY7BPK/ciud5CZO6woiXVSWjJHUe16stZGFTi9DgDU5brIFU3vbaGt4BPGfg7wU6kw7RuuCCUf4OJoclSTXrGoWwDB79e2CUfLkYYZa6uAvb5JMJvegOervsyTjubBTVOazVkJezdSALMk9FcxlqFy2Pq2GILoBXaqUAPM63UhoPVSDeQK2BlsocOGs/gqmVnHNWkLwzwHAw6OM6oKpernacZ4AtDerXctlHcysxWx8VTv220ucH8zkhHJW0Poij5qDLXbqLRAw0/7omiHlHKCmWPMb7TwvxC8P9HuDyUvyqUj8rmNWddYyXb2hkGap69bOSzSmqldhJ4ibFomC+ugJWVIc1KLxP4QTqsJ6qeTnnQuQzwyUZDtkAusbjzFkNF6qRthSFlZgBx2bdW6tYbV1incVFJSdQq2HUOd3GJhtLMRWRtPtiRMdLquB7I9cCQjcWHBvNZZ0+9wQiwCGRNm9HAKDXiA1bWri7oZ5AngQFkO4DfgykFVlaXS7ghVi8oj7oZzXZ/aGaqlDafyFEqFxqFHxnpqOT2UYVJy/CDts8bOeT1rVmRqLMXGdvqSuM5vlghlICnLba+l7PRZbST1yrKZkdHG7PA+9yUoX86LD+OsvXAUKCH8qcgK9InQkPNp1xWDXm9hgcY5Nlk9fQV9Bq8K5cNgVYAa4M1QBTp4aJgtw3YLkogVLYKeT3BbwWu8yn9cXZ3bKtKEEVXa9rcHdjobYM500hHJfdGZ1vs04uGcmiIo9JcdJfckMhf6KijH7083yHjWrnqzOZwcGOMnkbb1Bi5SosHJlAQuW3Eb1phaY4Jms8bcOkEFMg0n/X2sbg6I22SZLYC3cGqJiMmPWSFGIYvroIHGDwtZTexqFrIgOtweppFphELvQoI54ETGjFLCzoXstNLiyNzp1E6KJKTvlDnDgqYNnrWYD5npOOSZ8GQ3lSEr1pS4UxHpYkmnzr7kP+RWRaR1mpZqJQupr1bmQeLK1VUTn3a7km9Yxx152Kf/sJBQcW26pSap5F93KGvERvd+1F4I1irEfP7gh6KiDaa8L1s/afoiO0r48l59wB7LrA5F94nldhE/ecc+m8K9CP3uUNWbH2KUBGh49AE7UikJJCTfzlBvQPSGofO+xLoPcjUi7zLrwlUphIxzxuLpqAhky/dgwbQvwf4JIGlDS8IkNPX/C5KsloLTCi5ovgEl3J/hlXisqpnXGczazFAh1TQ6v8cdRcY/JFGOi6pp71+OE3b01REnVZgOJUatgaOyk/wFJ4bkrkhlI/K6qNUveZ22odMLzAJJdoW22gettwTCFCnH+muQT6nq37osPjqPus2aasLuJ52xgLbiiYw5epCYn5QYLn+2sJzsb51CHzlt4QOD1XINrc9capuY/LofObKOIFwOfLa5hwHuoV5ofwsI38Z6SONfFxSH7kOpg0FnjFgMraZeor1kNEqSVuEH4NDQdKb7mJkw6SAdQ5YM8wI5bUtPIm2n+CqHcA3If665GVPx1B5XPYPIcYloXweWZ3zaMur/qehTvihj6OCdMsnQhfQHbQDSUl/ATFDwlwX0N4ckjrqiKO+yGjeDEE+8Q6COntR57Q4pYXyOS0QXGIRmkiju1j4dcWiK4sxKO6Abwp9ce2/q94fbHodpbYBDtp8mcSd4FXwQVBoXNcgvRXQobvOWDQBXbQFfX4tEMKWC0jrDWUt6W5s+mmUAdinYHlHFC+jsvHY0ifQTfs6kxoV5HO+fkV7m2BPceyxRw+x43O2w2xOgWoHbPoiKMQmvSxKElg/Q06r+qeBglx49bQiZR3AlqAX2AG4aLgrYE3AWClrEoQzbcFX25DeeXcEk3SQ/c+826W9e+lvydmMbMCeh7n0VboGNJ42B2DXwri2se/P8E6O41exfBa6dsaWDwOdtD2V9PZBPuIqu56LKE9SpAep5kFri/DV2HNswMeeWgasd7GjB/a8HdijKzZpC6mH6nrK50ydZIDtZ0om5GxQRc3RF9uh+3UVKa+gMnZdBfKk2TTWLspkylsC/QlP3jSGBleJsilchlyanz4ppx+vUqnEP+QHOhRNC9uZNo/+0xxtlPz8DLKuQ3eHurLZr1Bzk7j+wdu1bM3lVzy8wR7qj7DoeCrO6Host/RDrCG1tJn29bvmedBEGnFuF5E5ELyWg0H649rUB7HUOQZ8nIF916OzTXguUOZ6MzgwXCdtnjZWBvOAjW4P9CKU94NO/j4jaN92Ra43SPKGEbGK6Atqf3/vkmkDNKmiaFlZYU22OT8vHg7eH7wQ5egqlL2HjpPS9oU6vwB6olabxqLweOA6RI81WXWB3lzqsLdSuh8F20U1RrnGxUYVr66CdmnkaFtDBV5nyZPOY4Wlz13kG82D1QM7k1yR3wjcBbIg/fdjw0HJG+EWBcfszfWRCCOXhTOs9+lXT/bicyL6V5MiBmEnGv4J0HmJDuQ3B0nfsCHa8DtCOkeYDV4Ej9K/57mWTdi0O5V1ttUTyKaSLRN5G82DqZcLOmD9j4A9sedU8FMRtsk3hwGtcnYDLUES0gezOrO7Dnt0ZhVJ6L8CRtdI5tLCC6mvflWFaO9+FNkCuf6oWoFa51mDqtLoUiV6a/cO0LnUW+A12pnCtSLCTgUVrYJ2BDpI7wicq3xkwqR79QUwUsC24mF/INgQsJShUb15egCspHyBmvpbQt1Ivei4buy6JvyvAd4YRD3lFlG+QKAvGtRcCJvWpyFhHGgFokg3QRfs0g2QC2HXhjSkgLpqTIMfYM/LMTxfnJMHGKetaErzuhhnYppWYJrOmGmeJyca2Ad8DQJqyltCbZHaJ++9l4zzAH50nSVNQUZvwTx5D+TrASaeflwsoIqXi3laHxjNVQebWpZ6qoIH8KUrYMn1+hzBk/dA/h5g8gUrrUWkXcu5/A2MaBE7uwKRX1lF+KeSInyaJGDJ9xW/SavETl+3GXuAyadP7EX9m4IbsHMY0MpKh36equgBfJo0YH2GbOz3O1U0yatqph6wrp6YfPvil2uBfispt8PetGOBnXpzpO9X+mBn7NugtHq9/FIP4F/9edaKCf3xJmPwekJZL+Y9UF0PMFn7Aa1c9J1Gmlfv1TUkQhv2rA0uAm8Bv7KK8JEv8h5YljxgXWEFHSUY9CM9upD/L9evA14Nr/qORd/OaOWnTxf8yqqGg+Gb9h7IwwOJApYMIWhFfaeVh422NprMd1a2Tnie94D3QDIPJA5YUldnQcsHq2Rj7KW8B5qvBxS0gPlxKdncyX+60HynoO+590A6DxCeahm0fLBKN1xe2nvAe6BGQcsHKz/1vAe8B8rzAEFrIPgA5EEzacT/uU15Q+VreQ94D8gDBJHVwOlgKsiCHkPpUO9t7wHvAe+B/wMDomt5lYhE1gAAAABJRU5ErkJggg=="
				id="b"
				width={300}
				height={59}
			/>
		</defs>
	</svg>
);
export default SquadsIcon;
