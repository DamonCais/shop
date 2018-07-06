<template>
	<div class="contain">
		<div @mouseenter="cubeEnter" @mouseleave="cubeLeave" class="cube">
			<div class="selects" v-for="(sel,i) in selects" :key="'sel'+i" ref="selects"></div>
			<div :class="{'onSel':
			Math.ceil(i/4)<=rowRange[1]&&
			Math.ceil(i/4)>=rowRange[0]&&
			(i-1)%4>=columnRange[0]&&
			(i-1)%4<=columnRange[1]}" @mouseenter="itemEnter(i)" @click="startSel(i)" class="item" v-for="i in 16" :key="i">
				+
			</div>
		</div>
		<div>
			{{startPoint}} {{endPoint}} {{rowRange}} {{columnRange}}
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			startPoint: { r: -1, c: -1 },
			endPoint: { r: -1, c: -1 },
			onSel: false,
			selects: [],
		}
	},
	computed: {
		rowRange() {
			let r1 = this.startPoint.r
			let r2 = this.endPoint.r
			return [Math.min(r1, r2), Math.max(r1, r2)]
		},
		columnRange() {
			let c1 = this.startPoint.c;
			let c2 = this.endPoint.c;
			return [Math.min(c1, c2), Math.max(c1, c2)]
		}
	},
	methods: {
		startSel(i) {
			if (this.onSel) {
				this.endPoint = {
					r: Math.ceil(i / 4),
					c: (i - 1) % 4
				};
				this.onSel = false;
				this.selects.push({
					startPoint: this.startPoint,
					endPoint: this.endPoint,
				});
				setTimeout(() => {
					this.setCube(this.selects.length - 1);
				}, 20);
				return;
			}
			this.startPoint = {
				r: Math.ceil(i / 4),
				c: (i - 1) % 4
			};
			this.endPoint = {
				r: Math.ceil(i / 4),
				c: (i - 1) % 4
			};
			this.onSel = true;
		},
		cubeEnter() {
			console.log('cubeEnter');
		},
		cubeLeave() {
			this.startPoint = -1;
			this.endPoint = -1;
			this.onSel = false;
		},
		itemEnter(i) {
			this.endPoint = {
				r: Math.ceil(i / 4),
				c: (i - 1) % 4
			};

		},
		setCube(i) {
			if (this.$refs.selects[i]) {
				let r1 = this.selects[i].startPoint.r;
				let r2 = this.selects[i].endPoint.r;
				let c1 = this.selects[i].startPoint.c;
				let c2 = this.selects[i].endPoint.c;
				this.$refs.selects[i].style.height = (Math.abs(r1 - r2) + 1) * 80 + 'px';
				this.$refs.selects[i].style.width = (Math.abs(c1 - c2) + 1) * 80 + 'px';
				this.$refs.selects[i].style.top = (Math.min(r1, r2) - 1) * 80 + 'px';
				this.$refs.selects[i].style.left = (Math.min(c1, c2)) * 80 + 'px';
			}
		}

	}
}
</script>

<style lang="scss" scoped>
.contain {
  // width: 1000px;
  margin: 10px;
  min-height: 300px;
  background: #fff;
  padding: 20px 100px;

  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  .cube {
    width: 320px;
    height: 320px;
    margin: 80px;
    border: 1px solid #aaa;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .selects {
      position: absolute;
      background: #aaa;
      height: 80px;
      width: 80px;
      left: 0;
      top: 0;
    }
    .item {
      flex-basis: 25%;
      border: 1px solid #aaa;
      box-sizing: border-box;
      text-align: center;
      justify-content: center;
      align-items: center;
      color: #aaa;
      display: flex;
      font-size: 26px;
      cursor: pointer;
    }
    .onSel {
      background: #eee;
    }
  }
}
</style>
