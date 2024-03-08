
export const Earth = ({ className, height = 14, width = 14 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={height}
            width={width}
            viewBox="0 0 512 512"
        >
            <path fill="#4d4e51" d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
        </svg >
    )
}

export const Users = ({ className, height = 14, width = 14, fill = 'none' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill={fill}
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-users-round"
        >
            <path d="M18 21a8 8 0 0 0-16 0" />
            <circle cx="10" cy="8" r="5" /><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
        </svg>
    )
}

export const ShareIcon = ({ height = 14, width = 14 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height={height} width={width}>
            <g id="send-email--mail-send-email-paper-airplane">
                <path id="Vector" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="m5.81234 11.0005 2.17799 2.168c0.13363 0.1369 0.30071 0.2366 0.4847 0.2892 0.18399 0.0526 0.37852 0.0562 0.56434 0.0105 0.18698 -0.0435 0.35963 -0.1343 0.50135 -0.2638 0.14173 -0.1295 0.24776 -0.2932 0.3079 -0.4755L13.4253 2.00876c0.0747 -0.20086 0.0901 -0.41893 0.0444 -0.62829 -0.0457 -0.20937 -0.1505 -0.401209 -0.302 -0.552731 -0.1515 -0.151523 -0.3434 -0.256351 -0.5527 -0.302025 -0.2094 -0.045674 -0.4275 -0.030273 -0.6283 0.044373L1.26653 4.14679c-0.18858 0.06441 -0.356534 0.17802 -0.486508 0.32907 -0.129974 0.15105 -0.217253 0.33407 -0.252815 0.53014 -0.036707 0.17833 -0.028536 0.36298 0.02378 0.53737 0.052316 0.17438 0.147137 0.33304 0.275944 0.46171L3.56441 8.74256l-0.08992 3.46684 2.33785 -1.2089Z" stroke-width="1">
                </path>
                <path id="Vector_2" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M13.1057 0.789795 3.56445 8.74247" stroke-width="1">
                </path>
            </g>
        </svg>
    )
}

export const MessIcon = ({ height = 14, width = 14 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width}>
            <defs>
            </defs>
            <title>facbook-messenger</title>
            <path
                d="M6.618 15.165a0.5 0.5 0 0 1 -0.693 -0.673l3.062 -5.443a1 1 0 0 1 1.4 -0.358L13 10.327a1 1 0 0 0 1.009 0.03l3.317 -1.807a0.5 0.5 0 0 1 0.663 0.7l-3.459 5.538a1 1 0 0 1 -1.378 0.318l-2.633 -1.645a1 1 0 0 0 -1.044 -0.009Z"
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            >
            </path>

            <path
                d="M12 1.577C5.787 1.577 0.75 6.156 0.75 11.805a9.6 9.6 0 0 0 2.316 6.215 1.022 1.022 0 0 1 0.241 0.658V21.4a1.023 1.023 0 0 0 1.48 0.915l2.07 -1.035a1.028 1.028 0 0 1 0.822 -0.042 12.119 12.119 0 0 0 4.321 0.794c6.213 0 11.25 -4.579 11.25 -10.227S18.213 1.577 12 1.577Z"
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            >
            </path>
        </svg>
    )
}

export const ImageUpload = ({ height = 14, width = 14, fill = 'none' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 62 37"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M46.2556 7.92857H8.12593C7.11467 7.92857 6.14483 8.20702 5.42976 8.70265C4.71469 9.19828 4.31297 9.8705 4.31297 10.5714V31.7143L14.4021 25.493C14.7137 25.2778 15.1232 25.1439 15.561 25.114C15.9988 25.0842 16.438 25.1602 16.8042 25.3291L26.9467 30.0149L41.0928 20.2099C41.3756 20.0138 41.7402 19.8842 42.135 19.8396C42.5299 19.795 42.935 19.8377 43.2929 19.9615L50.0685 25.1071V10.5714C50.0685 9.8705 49.6668 9.19828 48.9518 8.70265C48.2367 8.20702 47.2668 7.92857 46.2556 7.92857ZM8.12593 5.28572C6.10341 5.28572 4.16372 5.8426 2.73358 6.83387C1.30344 7.82513 0.5 9.16957 0.5 10.5714V31.7143C0.5 33.1161 1.30344 34.4606 2.73358 35.4519C4.16372 36.4431 6.10341 37 8.12593 37H46.2556C48.2781 37 50.2178 36.4431 51.6479 35.4519C53.0781 34.4606 53.8815 33.1161 53.8815 31.7143V10.5714C53.8815 9.16957 53.0781 7.82513 51.6479 6.83387C50.2178 5.8426 48.2781 5.28572 46.2556 5.28572H8.12593ZM23.3778 17.1786C23.3778 17.6992 23.2299 18.2147 22.9424 18.6956C22.655 19.1766 22.2337 19.6136 21.7026 19.9817C21.1715 20.3499 20.541 20.6419 19.8471 20.8411C19.1532 21.0403 18.4094 21.1429 17.6583 21.1429C16.9073 21.1429 16.1635 21.0403 15.4696 20.8411C14.7757 20.6419 14.1452 20.3499 13.6141 19.9817C13.083 19.6136 12.6617 19.1766 12.3743 18.6956C12.0868 18.2147 11.9389 17.6992 11.9389 17.1786C11.9389 16.1272 12.5415 15.1188 13.6141 14.3754C14.6867 13.632 16.1415 13.2143 17.6583 13.2143C19.1752 13.2143 20.63 13.632 21.7026 14.3754C22.7752 15.1188 23.3778 16.1272 23.3778 17.1786Z" fill="black" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7444 2.64286H53.8741C54.8853 2.64286 55.8552 2.9213 56.5702 3.41693C57.2853 3.91256 57.687 4.58478 57.687 5.28571V26.4286C57.687 27.1295 57.2853 27.8017 56.5702 28.2974C55.8552 28.793 54.8853 29.0714 53.8741 29.0714V31.7143C55.8966 31.7143 57.8363 31.1574 59.2664 30.1661C60.6966 29.1749 61.5 27.8304 61.5 26.4286V5.28571C61.5 3.88386 60.6966 2.53941 59.2664 1.54815C57.8363 0.556886 55.8966 0 53.8741 0H15.7444C13.7219 0 11.7822 0.556886 10.3521 1.54815C8.92193 2.53941 8.11849 3.88386 8.11849 5.28571H11.9315C11.9315 4.58478 12.3332 3.91256 13.0482 3.41693C13.7633 2.9213 14.7332 2.64286 15.7444 2.64286Z" fill="black" />
        </svg>

    )
}

export const MultipleImages = ({ height = 14, width = 14, fill = 'none', color = 'black' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 29 24"
            fill={fill}
        >
            <path d="M10.9554 20.9994L18.1733 20.9996C20.8309 20.9997 22.9853 19.2089 22.9853 16.9998L22.9855 8.99976" stroke={color} />
            <path d="M6.64371 12.4994L6.64382 8.49942C6.64385 7.3127 6.64494 6.4729 6.73257 5.82686C6.81786 5.19809 6.97834 4.81427 7.2571 4.51229C7.41856 4.33739 7.60904 4.17854 7.82478 4.04094C8.21384 3.79279 8.7181 3.6491 9.51111 3.57481C10.3092 3.50003 11.3398 3.49954 12.7603 3.49958C14.1809 3.49962 15.2114 3.50016 16.0096 3.57498C16.8026 3.64931 17.3068 3.79303 17.6959 4.0412C17.9116 4.17881 18.1021 4.33767 18.2635 4.51258C18.5423 4.81457 18.7027 5.1984 18.788 5.82717C18.8756 6.47323 18.8766 7.31303 18.8766 8.49974L18.8765 12.4997C18.8765 13.6865 18.8754 14.5263 18.7877 15.1723C18.7024 15.8011 18.542 16.1849 18.2632 16.4869C18.1017 16.6618 17.9113 16.8206 17.6955 16.9582C17.3065 17.2064 16.8022 17.3501 16.0092 17.4244C15.2111 17.4991 14.1805 17.4996 12.76 17.4996C11.3394 17.4995 10.3089 17.499 9.51074 17.4242C8.71774 17.3498 8.21348 17.2061 7.82444 16.958C7.60871 16.8204 7.41824 16.6615 7.25678 16.4866C6.97804 16.1846 6.81758 15.8008 6.73233 15.172C6.64473 14.5259 6.64368 13.6861 6.64371 12.4994Z" stroke={color} />
        </svg>
    )
}

export const ImageIcon = ({ height = 14, width = 14, fill = 'none' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 30 29"
            fill={fill}
        >
            <path d="M5.77989 15.6224C4.93794 11.9464 4.51696 10.1083 5.3974 8.70477C6.27784 7.3012 8.11586 6.88022 11.7919 6.03827L13.7414 5.59175C17.4175 4.7498 19.2555 4.32882 20.6591 5.20926C22.0626 6.0897 22.4836 7.92773 23.3256 11.6038L23.7721 13.5533C24.614 17.2293 25.035 19.0674 24.1546 20.4709C23.2741 21.8745 21.4361 22.2955 17.7601 23.1374L15.8105 23.5839C12.1345 24.4259 10.2965 24.8469 8.8929 23.9664C7.48934 23.086 7.06836 21.248 6.22641 17.5719L5.77989 15.6224Z" stroke="#0B0A0A" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.1083 15.2582L21.6971 15.0002L21.6781 14.9883C21.1982 14.6873 20.8112 14.4445 20.4815 14.2749C20.1419 14.1002 19.8229 13.9811 19.476 13.9575C18.9852 13.9241 18.4955 14.0363 18.0682 14.2799C17.7661 14.4521 17.5307 14.6982 17.301 15.0033C17.078 15.2995 16.8352 15.6866 16.5342 16.1665L16.5223 16.1854C16.2971 16.5445 16.1466 16.7835 16.018 16.9509C15.8905 17.117 15.8273 17.1537 15.8009 17.1649C15.6879 17.2125 15.5612 17.217 15.4451 17.1773C15.418 17.168 15.3524 17.1358 15.2136 16.979C15.0737 16.8209 14.9069 16.5931 14.6571 16.2505L14.5773 16.141L14.5592 16.1163L14.5592 16.1163C14.0139 15.3684 13.5804 14.7739 13.1931 14.3477C12.7995 13.9147 12.3988 13.5918 11.8995 13.4699C11.4523 13.3606 10.9837 13.377 10.5453 13.5171C10.0557 13.6736 9.67851 14.0237 9.3161 14.4831C8.95943 14.9352 8.56843 15.5585 8.07661 16.3426L8.0766 16.3426L8.06033 16.3685L8.018 16.436L8.17586 17.1253C8.23087 17.3654 8.28347 17.5948 8.33406 17.814L8.90746 16.8999C9.41923 16.0841 9.78199 15.5071 10.1012 15.1025C10.4186 14.7001 10.6426 14.5359 10.8497 14.4697C11.1128 14.3856 11.394 14.3758 11.6622 14.4413C11.8735 14.4929 12.1084 14.6411 12.4531 15.0203C12.7997 15.4017 13.2018 15.952 13.7693 16.7302L13.8491 16.8397L13.8635 16.8594L13.8635 16.8594C14.0951 17.1771 14.2897 17.4439 14.4648 17.6417C14.6445 17.8449 14.8503 18.0309 15.1219 18.1236C15.4702 18.2426 15.8501 18.2293 16.1893 18.0864C16.4538 17.9749 16.6461 17.775 16.8113 17.5598C16.9721 17.3503 17.1476 17.0705 17.3565 16.7374L17.3695 16.7168C17.6852 16.2135 17.9056 15.8629 18.0999 15.6048C18.2905 15.3517 18.429 15.2253 18.5635 15.1486C18.8199 15.0025 19.1137 14.9352 19.4081 14.9552C19.5627 14.9657 19.7423 15.0192 20.024 15.1641C20.3113 15.3119 20.6624 15.5316 21.1657 15.8473L22.3976 16.6201C22.3188 16.2171 22.222 15.7672 22.1083 15.2582Z" fill="black" />
            <circle cx="18.1577" cy="9.19677" r="1.5" transform="rotate(-12.9004 18.1577 9.19677)" fill="#0B0A0A" />
        </svg>
    )
}

export const VideoIcon = ({ height = 14, width = 14, fill = 'none' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 30 29"
            fill={fill}
        >
            <path d="M20.6511 6.42203L15.423 5.22464C13.0599 4.6834 11.8783 4.41278 11.0133 4.81564C10.1484 5.2185 9.93794 6.13751 9.51697 7.97554L7.28447 17.7231C6.86351 19.5612 6.65302 20.4802 7.25639 21.2193C7.85976 21.9585 9.04135 22.2291 11.4045 22.7703L18.9241 24.4926C21.2873 25.0338 22.4689 25.3044 23.3338 24.9016C24.1987 24.4987 24.4092 23.5797 24.8302 21.7417L26.6545 13.7763C26.7457 13.3779 26.7914 13.1787 26.737 12.9777C26.6826 12.7767 26.5338 12.5944 26.2361 12.2297L22.2927 7.39896C21.995 7.03426 21.8462 6.85191 21.6328 6.72496C21.4195 6.59802 21.1634 6.53935 20.6511 6.42203Z" stroke="#100F0F" />
            <path d="M16.568 16.8546L13.7702 14.8146C13.0741 14.307 12.0858 14.6765 11.8935 15.5163L11.3666 17.817C11.1742 18.6567 11.9032 19.4196 12.7508 19.2656L16.1576 18.6465C17.0226 18.4893 17.2784 17.3726 16.568 16.8546Z" stroke="#0F0E0E" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22.0364 7.22508L21.2336 10.7306C21.0443 11.5569 20.9497 11.97 21.1805 12.293C21.4112 12.616 21.8772 12.7228 22.8093 12.9362L26.7636 13.8419" stroke="#1C1B1B" />
        </svg>
    )
}
