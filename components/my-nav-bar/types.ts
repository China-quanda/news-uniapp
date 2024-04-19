// interface Props {
//   bgColor: string;//fff
//   title?: string;
//   leftText?: string;
//   rightText?: string;
//   leftIcon?: string;//icon-xiangzuojiantou
//   rightIcon?: string;
//   color: string;//#000000
//   fixed: boolean;//true
//   statusBar: boolean;//true
//   shadow: boolean;// 微信小程序不支持false
//   border: boolean;// 微信小程序不支持false
//   height: string | number;// '44px'
//   leftWidth: string | number;// '40px'
//   rightWidth: string | number;// '40px'
// }

// const props = withDefaults(defineProps<Props>(), {
//   bgColor: '#fff',
//   leftIcon: 'icon-xiangzuojiantou',
//   color: '#000000',
//   fixed: true,
//   statusBar: true,
//   shadow: true,
//   border: true,
//   height: '44px',
//   leftWidth: '40px',
//   rightWidth: '40px'
// });

// const props = defineProps({
//   bgColor: {
//     type: String,
//     default: '#fff'
//   },
//   title: {
//     type: String,
//     default: ''
//   },
//   leftText: {
//     type: String,
//     default: ''
//   },
//   rightText: {
//     type: String,
//     default: ''
//   },
//   leftIcon: {
//     type: String,
//     default: 'icon-xiangzuojiantou'
//   },
//   rightIcon: {
//     type: String,
//     default: ''
//   },
//   color: {
//     type: String,
//     default: '#000000'
//   },
//   fixed: {
//     type: Boolean,
//     default: false
//   },
//   statusBar: {
//     type: Boolean,
//     default: true
//   },
//   shadow: {
//     // 微信小程序不支持
//     type: Boolean,
//     default: false
//   },
//   border: {
//     // 微信小程序不支持
//     type: Boolean,
//     default: false
//   },
//   height: {
//     type: [Number, String],
//     default: '44px'
//   },
//   leftWidth: {
//     type: [String, Number],
//     default: '40px'
//   },
//   rightWidth: {
//     type: [String, Number],
//     default: '40px'
//   }
// })




// const emit = defineEmits(['clickLeft', 'clickRight', 'clickCenter'])

// const emit = defineEmits<{
//   (e: 'clickLeft'): void
//   (e: 'clickRight'): void
//   (e: 'clickCenter'): void
// }>()

// export interface ExampleEmits {
//   (e: 'click'): void
//   (e: 'change', id: number): void
//   (e: 'update:show', value: string): void
// }
// const emit = defineEmits<ExampleEmits>()




// export type Type = 'success' | 'info' | 'warning' | 'error';