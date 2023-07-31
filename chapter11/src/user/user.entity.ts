import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 엔티티 객체임을 알려주기 위한 데코레이터
@Entity()
export class User{
    // id 는 pk 이면서 자동 증가하는 값
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})       // 패스워드에 빈 값 허용
    password: string;

    @Column()
    username: string;

    @Column({default: true})
    createdDt: Date = new Date();

    @Column({nullable: true})       // providerId 에 빈 값 허용
    providerId: string;                     // providerId 추가

}

